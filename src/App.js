import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import PredictionScreen from './screens/PredictionScreen';
import FieldMonitoringScreen from './screens/FieldMonitoringScreen';
import ChatbotScreen from './screens/ChatbotScreen';
import OfficerDashboard from './screens/OfficerDashboard';
import Sidebar from './components/Sidebar';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('farmer'); // 'farmer' | 'officer'
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = (role) => {
    setUserRole(role);
    setLoggedIn(true);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setCurrentScreen('login');
    setSidebarOpen(false);
  };

  const navigate = (screen) => {
    setCurrentScreen(screen);
    setSidebarOpen(false);
  };

  if (!loggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const screenMap = {
    home: <HomeScreen navigate={navigate} userRole={userRole} />,
    prediction: <PredictionScreen navigate={navigate} />,
    fieldMonitoring: <FieldMonitoringScreen navigate={navigate} />,
    chatbot: <ChatbotScreen navigate={navigate} />,
    officerDashboard: <OfficerDashboard navigate={navigate} />,
  };

  return (
    <div className="flex min-h-screen bg-slate-50" dir="rtl">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navigate={navigate}
        currentScreen={currentScreen}
        userRole={userRole}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-5 h-[60px] flex items-center justify-between sticky top-0 z-[100] shadow-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-transparent border-none cursor-pointer p-1.5 rounded-lg flex flex-col gap-1.5"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} className="block w-5.5 h-0.5 bg-slate-700 rounded-full" />
            ))}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center text-white font-bold text-sm">
              ک
            </div>
            <div>
              <div className="text-[15px] font-bold text-green-800">کسان ساتھی</div>
              <div className="urdu-sm text-slate-500 text-[11px] leading-tight">
                {userRole === 'officer' ? 'افسر پینل' : 'کسان پینل'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3 py-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="urdu-sm text-green-700 text-xs">آن لائن</span>
          </div>
        </header>

        {/* Quick navigation — Urdu, role-aware, always visible */}
        <nav className="bg-white border-b border-slate-100 sticky top-[60px] z-[90] px-3 py-2 shadow-sm">
          <div className="max-w-[980px] mx-auto flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
            {[
              { id: 'home', label: 'ہوم', icon: '⌂', roles: ['farmer', 'officer'] },
              { id: 'chatbot', label: 'AI معاون', icon: '◉', roles: ['farmer', 'officer'] },
              ...(userRole === 'farmer'
                ? [
                    { id: 'fieldMonitoring', label: 'کھیت کی پروجیکشن', icon: '◫', roles: ['farmer'] },
                    { id: 'prediction', label: 'فصل کی پیش گوئی', icon: '↗', roles: ['farmer'] },
                  ]
                : [
                    { id: 'officerDashboard', label: 'افسر ڈیش بورڈ', icon: '▦', roles: ['officer'] },
                  ]),
            ].filter((item) => item.roles.includes(userRole)).map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`urdu-sm flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  currentScreen === item.id
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-green-50 hover:text-green-700'
                }`}
              >
                <span className="text-base leading-none">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <main className="flex-1 overflow-auto">{screenMap[currentScreen] || screenMap.home}</main>
      </div>
    </div>
  );
}
