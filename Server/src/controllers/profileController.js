const { query } = require('../config/db');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

// Get user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const [profile] = await query(`
      SELECT id, name, email, phone, bio, location, avatar, join_date, created_at 
      FROM users WHERE id = ?
    `, [userId]);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Format the response
    const profileData = {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      bio: profile.bio || '',
      location: profile.location || '',
      avatar: profile.avatar || '',
      joinDate: profile.join_date || profile.created_at
    };

    res.status(200).json({
      message: 'Profile fetched successfully',
      data: profileData
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, bio, location } = req.body;

    // Validate required fields
    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone are required' });
    }

    // Check if phone is already taken by another user
    const [existingUser] = await query(
      'SELECT id FROM users WHERE phone = ? AND id != ?', 
      [phone, userId]
    );
    
    if (existingUser) {
      return res.status(400).json({ message: 'Phone number already exists' });
    }

    // Update profile
    await query(`
      UPDATE users 
      SET name = ?, phone = ?, bio = ?, location = ? 
      WHERE id = ?
    `, [name, phone, bio || '', location || '', userId]);

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

// Upload profile avatar
const uploadAvatar = async (req, res) => {
  try {
    const userId = req.user.id;
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Get current avatar to delete old one
    const [currentUser] = await query('SELECT avatar FROM users WHERE id = ?', [userId]);
    
    // Delete old avatar if exists
    if (currentUser && currentUser.avatar) {
      const oldAvatarPath = path.join(__dirname, '..', currentUser.avatar);
      if (fs.existsSync(oldAvatarPath)) {
        fs.unlinkSync(oldAvatarPath);
      }
    }

    // Update avatar path in database
    const avatarPath = `/uploads/images/${req.file.filename}`;
    await query('UPDATE users SET avatar = ? WHERE id = ?', [avatarPath, userId]);

    res.status(200).json({
      message: 'Avatar updated successfully',
      avatar: avatarPath
    });
  } catch (error) {
    console.error('Upload avatar error:', error);
    res.status(500).json({ message: 'Failed to upload avatar' });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: 'New password must be at least 8 characters long' });
    }

    // Get current user
    const [user] = await query('SELECT password FROM users WHERE id = ?', [userId]);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await query('UPDATE users SET password = ? WHERE id = ?', [hashedNewPassword, userId]);

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Failed to change password' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadAvatar,
  changePassword
};