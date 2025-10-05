import React from 'react';
import { TrendingUp } from 'lucide-react';

function QuizHistory({ results }) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Quiz History</h1>
        <p className="text-gray-600">View your past quiz attempts</p>
      </div>

      {results.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <TrendingUp size={64} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No history yet</h3>
          <p className="text-gray-600">Take a quiz to see your results here!</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Quiz</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Score</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Percentage</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {results.map(result => (
                  <tr key={result.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-800">{result.quizTitle}</td>
                    <td className="px-6 py-4 text-gray-600">{result.date}</td>
                    <td className="px-6 py-4 text-gray-800">{result.score}/{result.totalPoints}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        result.percentage >= 80 ? 'bg-green-100 text-green-700' :
                        result.percentage >= 60 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {result.percentage}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{result.timeTaken}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizHistory;
