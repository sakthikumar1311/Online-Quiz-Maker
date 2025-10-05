import React from 'react';
import { Home, FileText, TrendingUp, Settings, LogOut, Menu, X } from 'lucide-react';

function DashboardLayout({ user, children, sidebarOpen, setSidebarOpen, onLogout, setCurrentView }) {
  return (
    <div className="min-h-screen flex">
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && <h2 className="text-xl font-bold text-gray-800">QuizMaker</h2>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
          >
            <Home size={20} />
            {sidebarOpen && <span>Dashboard</span>}
          </button>
          <button
            onClick={() => setCurrentView('myquizzes')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
          >
            <FileText size={20} />
            {sidebarOpen && <span>My Quizzes</span>}
          </button>
          <button
            onClick={() => setCurrentView('history')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
          >
            <TrendingUp size={20} />
            {sidebarOpen && <span>History</span>}
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className={`${sidebarOpen ? 'flex' : 'block'} items-center gap-3 mb-3`}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              {user.username[0].toUpperCase()}
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{user.username}</p>
                <p className="text-xs text-gray-500">User</p>
              </div>
            )}
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
