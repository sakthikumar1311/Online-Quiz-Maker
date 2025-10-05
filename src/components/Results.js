import React from 'react';
import { Award } from 'lucide-react';

function ResultsView({ quiz, onBackToDashboard }) {
  const { result } = quiz;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
            result.percentage >= 80 ? 'bg-green-100' :
            result.percentage >= 60 ? 'bg-yellow-100' : 'bg-red-100'
          }`}>
            <Award size={48} className={
              result.percentage >= 80 ? 'text-green-600' :
              result.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
            } />
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
          <p className="text-gray-600 mb-8">{quiz.title}</p>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-1">{result.percentage}%</div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
            <div className="p-6 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-1">{result.score}/{result.totalPoints}</div>
              <div className="text-sm text-gray-600">Points</div>
            </div>
            <div className="p-6 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-1">{result.timeTaken}s</div>
              <div className="text-sm text-gray-600">Time</div>
            </div>
          </div>

          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all duration-500 ${
                  result.percentage >= 80 ? 'bg-green-500' :
                  result.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${result.percentage}%` }}
              />
            </div>
          </div>

          <button
            onClick={onBackToDashboard}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultsView;
