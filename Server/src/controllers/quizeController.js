const { generateQuestions } = require('../service/geminiService');
const { v4: uuidv4 } = require('uuid');

exports.getQuizQuestions = async (req, res) => {
  const { technology, level, mcqCount, textCount } = req.body;

  if (!technology || !level || mcqCount === undefined || textCount === undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const questions = await generateQuestions(technology, level, mcqCount, textCount);

    // Add UUID to each question
    const questionsWithId = questions.map(q => ({ ...q, id: uuidv4() }));
    res.json({ questions: questionsWithId });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch questions', error: err.message });
  }
};