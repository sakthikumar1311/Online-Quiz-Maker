import React from 'react';
import { Edit2, Trash2, BookOpen } from 'lucide-react';

function MyQuizzes({ quizzes, onEditQuiz, onDeleteQuiz }) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">My Quizzes</h1>
        <p className="text-gray-600">Manage your created quizzes</p>
      </div>

      {quizzes.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <BookOpen size={64} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No quizzes yet</h3>
          <p className="text-gray-600">Create your first quiz to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map(quiz => (
            <div key={quiz.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                quiz.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                quiz.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {quiz.difficulty}
              </span>
              <h3 className="text-xl font-bold text-gray-800 mt-4 mb-2">{quiz.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span>{quiz.questions.length} questions</span>
                <span>{quiz.attempts} attempts</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEditQuiz(quiz)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <Edit2 size={16} />
                  Edit
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
      )}
    </div>
  );
}

export default MyQuizzes;
