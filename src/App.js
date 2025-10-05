import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Play, Save, Clock, Award, BookOpen, Users, TrendingUp, Home, PlusCircle, FileText, Settings, LogOut, Menu, X, Check, AlertCircle } from 'lucide-react';
import LoginView from './components/Auth';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './components/Home';
import QuizCreator from './components/CreateQuiz';
import QuizTaker from './components/TakeQuiz';
import ResultsView from './components/Results';
import MyQuizzes from './components/QuizList';
import QuizHistory from './components/QuizHistory';

export default function QuizMakerApp() {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [quizResults, setQuizResults] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notification, setNotification] = useState(null);

  // Sample quiz data
  useEffect(() => {
    const sampleQuizzes = [
      {
        id: 1,
        title: 'JavaScript Fundamentals',
        description: 'Test your knowledge of JavaScript basics',
        category: 'Programming',
        difficulty: 'Intermediate',
        timeLimit: 15,
        questions: [
          {
            id: 1,
            question: 'What is the correct way to declare a variable in JavaScript?',
            options: ['var x = 5', 'variable x = 5', 'v x = 5', 'declare x = 5'],
            correct: 0,
            points: 10
          },
          {
            id: 2,
            question: 'Which method is used to add an element to the end of an array?',
            options: ['append()', 'push()', 'add()', 'insert()'],
            correct: 1,
            points: 10
          }
        ],
        createdBy: 'admin',
        attempts: 45,
        avgScore: 85
      }
    ];
    setQuizzes(sampleQuizzes);
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = (username, password) => {
    if (username && password) {
      setUser({ username, role: 'user' });
      setCurrentView('dashboard');
      showNotification('Welcome back!');
    }
  };

  const handleRegister = (username, email, password) => {
    if (username && email && password) {
      setUser({ username, email, role: 'user' });
      setCurrentView('dashboard');
      showNotification('Account created successfully!');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
    showNotification('Logged out successfully');
  };

  const createNewQuiz = () => {
    const newQuiz = {
      id: Date.now(),
      title: '',
      description: '',
      category: '',
      difficulty: 'Easy',
      timeLimit: 10,
      questions: [],
      createdBy: user.username,
      attempts: 0,
      avgScore: 0
    };
    setEditingQuiz(newQuiz);
    setCurrentView('create');
  };

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      question: '',
      options: ['', '', '', ''],
      correct: 0,
      points: 10
    };
    setEditingQuiz({
      ...editingQuiz,
      questions: [...editingQuiz.questions, newQuestion]
    });
  };

  const updateQuestion = (qId, field, value) => {
    setEditingQuiz({
      ...editingQuiz,
      questions: editingQuiz.questions.map(q =>
        q.id === qId ? { ...q, [field]: value } : q
      )
    });
  };

  const updateOption = (qId, optIndex, value) => {
    setEditingQuiz({
      ...editingQuiz,
      questions: editingQuiz.questions.map(q =>
        q.id === qId ? {
          ...q,
          options: q.options.map((opt, i) => i === optIndex ? value : opt)
        } : q
      )
    });
  };

  const deleteQuestion = (qId) => {
    setEditingQuiz({
      ...editingQuiz,
      questions: editingQuiz.questions.filter(q => q.id !== qId)
    });
  };

  const saveQuiz = () => {
    if (!editingQuiz.title || editingQuiz.questions.length === 0) {
      showNotification('Please add a title and at least one question', 'error');
      return;
    }
    
    const existingIndex = quizzes.findIndex(q => q.id === editingQuiz.id);
    if (existingIndex >= 0) {
      setQuizzes(quizzes.map(q => q.id === editingQuiz.id ? editingQuiz : q));
      showNotification('Quiz updated successfully!');
    } else {
      setQuizzes([...quizzes, editingQuiz]);
      showNotification('Quiz created successfully!');
    }
    setEditingQuiz(null);
    setCurrentView('dashboard');
  };

  const startQuiz = (quiz) => {
    setCurrentQuiz({
      ...quiz,
      currentQuestion: 0,
      answers: [],
      startTime: Date.now()
    });
    setCurrentView('taking');
  };

  const answerQuestion = (answer) => {
    setCurrentQuiz({
      ...currentQuiz,
      answers: [...currentQuiz.answers, answer]
    });
  };

  const nextQuestion = () => {
    if (currentQuiz.currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuiz({
        ...currentQuiz,
        currentQuestion: currentQuiz.currentQuestion + 1
      });
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = () => {
    const score = currentQuiz.answers.reduce((acc, answer, idx) => {
      return answer === currentQuiz.questions[idx].correct ? 
        acc + currentQuiz.questions[idx].points : acc;
    }, 0);
    
    const totalPoints = currentQuiz.questions.reduce((acc, q) => acc + q.points, 0);
    const percentage = Math.round((score / totalPoints) * 100);
    
    const result = {
      id: Date.now(),
      quizId: currentQuiz.id,
      quizTitle: currentQuiz.title,
      score,
      totalPoints,
      percentage,
      timeTaken: Math.round((Date.now() - currentQuiz.startTime) / 1000),
      date: new Date().toLocaleDateString()
    };
    
    setQuizResults([result, ...quizResults]);
    setCurrentQuiz({ ...currentQuiz, result });
    setCurrentView('results');
    showNotification(`Quiz completed! Score: ${percentage}%`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
          notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        } text-white`}>
          {notification.type === 'error' ? <AlertCircle size={20} /> : <Check size={20} />}
          {notification.message}
        </div>
      )}

      {currentView === 'login' && <LoginView onLogin={handleLogin} onRegister={handleRegister} />}
      
      {currentView === 'dashboard' && (
        <DashboardLayout 
          user={user} 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onLogout={handleLogout}
          setCurrentView={setCurrentView}
        >
          <Dashboard 
            quizzes={quizzes} 
            quizResults={quizResults}
            onCreateQuiz={createNewQuiz}
            onStartQuiz={startQuiz}
            onEditQuiz={(quiz) => {
              setEditingQuiz(quiz);
              setCurrentView('create');
            }}
            onDeleteQuiz={(id) => {
              setQuizzes(quizzes.filter(q => q.id !== id));
              showNotification('Quiz deleted');
            }}
          />
        </DashboardLayout>
      )}

      {currentView === 'create' && editingQuiz && (
        <DashboardLayout 
          user={user} 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onLogout={handleLogout}
          setCurrentView={setCurrentView}
        >
          <QuizCreator 
            quiz={editingQuiz}
            setQuiz={setEditingQuiz}
            onSave={saveQuiz}
            onCancel={() => {
              setEditingQuiz(null);
              setCurrentView('dashboard');
            }}
            addQuestion={addQuestion}
            updateQuestion={updateQuestion}
            updateOption={updateOption}
            deleteQuestion={deleteQuestion}
          />
        </DashboardLayout>
      )}

      {currentView === 'taking' && currentQuiz && (
        <QuizTaker 
          quiz={currentQuiz}
          onAnswer={answerQuestion}
          onNext={nextQuestion}
          onSubmit={submitQuiz}
        />
      )}

      {currentView === 'results' && currentQuiz && (
        <ResultsView 
          quiz={currentQuiz}
          onBackToDashboard={() => {
            setCurrentQuiz(null);
            setCurrentView('dashboard');
          }}
        />
      )}

      {currentView === 'myquizzes' && (
        <DashboardLayout 
          user={user} 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onLogout={handleLogout}
          setCurrentView={setCurrentView}
        >
          <MyQuizzes 
            quizzes={quizzes.filter(q => q.createdBy === user.username)}
            onEditQuiz={(quiz) => {
              setEditingQuiz(quiz);
              setCurrentView('create');
            }}
            onDeleteQuiz={(id) => {
              setQuizzes(quizzes.filter(q => q.id !== id));
              showNotification('Quiz deleted');
            }}
          />
        </DashboardLayout>
      )}

      {currentView === 'history' && (
        <DashboardLayout 
          user={user} 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onLogout={handleLogout}
          setCurrentView={setCurrentView}
        >
          <QuizHistory results={quizResults} />
        </DashboardLayout>
      )}
    </div>
  );
}
