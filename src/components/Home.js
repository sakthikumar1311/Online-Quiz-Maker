import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Play, Clock, Award, BookOpen, TrendingUp, PlusCircle } from 'lucide-react';

function Dashboard({ quizzes, quizResults, onCreateQuiz, onStartQuiz, onEditQuiz, onDeleteQuiz }) {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || quiz.difficulty === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalQuizzes: quizzes.length,
    quizzesTaken: quizResults.length,
    avgScore: quizResults.length > 0 
      ? Math.round(quizResults.reduce((acc, r) => acc + r.percentage, 0) / quizResults.length)
      : 0,
    totalTime: quizResults.reduce((acc, r) => acc + r.timeTaken, 0)
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Manage and take quizzes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="text-blue-600" size={24} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-1">{stats.totalQuizzes}</h3>
          <p className="text-gray-600 text-sm">Total Quizzes</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Play className="text-green-600" size={24} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-1">{stats.quizzesTaken}</h3>
          <p className="text-gray-600 text-sm">Quizzes Taken</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="text-purple-600" size={24} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-1">{stats.avgScore}%</h3>
          <p className="text-gray-600 text-sm">Average Score</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="text-orange-600" size={24} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-1">{Math.floor(stats.totalTime / 60)}m</h3>
          <p className="text-gray-600 text-sm">Total Time</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Hard">Hard</option>
          </select>
          <button
            onClick={onCreateQuiz}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2"
          >
            <PlusCircle size={20} />
            Create Quiz
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map(quiz => (
            <div key={quiz.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  quiz.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  quiz.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {quiz.difficulty}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{quiz.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{quiz.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <BookOpen size={16} />
                  {quiz.questions.length} questions
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {quiz.timeLimit} min
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onStartQuiz(quiz)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <Play size={16} />
                  Start
                </button>
                <button
                  onClick={() => onEditQuiz(quiz)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => onDeleteQuiz(quiz.id)}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
