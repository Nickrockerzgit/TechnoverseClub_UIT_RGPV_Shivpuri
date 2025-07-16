const { query } = require('../config/db');

class ProfileService {
  // Get user profile with additional data
  static async getProfileWithStats(userId) {
    try {
      const [profile] = await query(`
        SELECT 
          u.id, u.name, u.email, u.phone, u.bio, u.location, 
          u.avatar, u.join_date, u.created_at,
          DATE_FORMAT(u.join_date, '%M %Y') as joinDate
        FROM users u 
        WHERE u.id = ?
      `, [userId]);

      return profile;
    } catch (error) {
      throw new Error('Failed to fetch profile data');
    }
  }

  // Validate profile data
  static validateProfileData(data) {
    const errors = [];

    if (!data.name || data.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    if (!data.phone || !/^\+?[\d\s-()]{10,}$/.test(data.phone)) {
      errors.push('Invalid phone number format');
    }

    if (data.bio && data.bio.length > 500) {
      errors.push('Bio must be less than 500 characters');
    }

    if (data.location && data.location.length > 100) {
      errors.push('Location must be less than 100 characters');
    }

    return errors;
  }

  // Check if user exists
  static async userExists(userId) {
    try {
      const [user] = await query('SELECT id FROM users WHERE id = ?', [userId]);
      return !!user;
    } catch (error) {
      return false;
    }
  }
}

module.exports = ProfileService;