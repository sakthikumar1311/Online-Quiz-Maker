const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

const quizzesFile = path.join(__dirname, '../data/quizzes.json');

// Helper function to read quizzes
async function readQuizzes() {
  try {
    const data = await fs.readFile(quizzesFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Helper function to write quizzes
async function writeQuizzes(quizzes) {
  await fs.writeFile(quizzesFile, JSON.stringify(quizzes, null, 2));
}

// Get all quizzes
router.get('/', async (req, res) => {
  const quizzes = await readQuizzes();
  res.json(quizzes);
});

// Get quiz by id
router.get('/:id', async (req, res) => {
  const quizzes = await readQuizzes();
  const quiz = quizzes.find(q => q.id === req.params.id);
  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found' });
  }
  res.json(quiz);
});

// Create new quiz
router.post('/', async (req, res) => {
  const { title, questions, userId } = req.body;
  if (!title || !questions || !Array.isArray(questions)) {
    return res.status(400).json({ message: 'Invalid quiz data' });
  }

  const quizzes = await readQuizzes();
  const newQuiz = {
    id: Date.now().toString(),
    title,
    questions,
    userId: userId || null,
  };
  quizzes.push(newQuiz);
  await writeQuizzes(quizzes);
  res.status(201).json(newQuiz);
});

module.exports = router;
