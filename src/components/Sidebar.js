import React from 'react';

const navItems = [
  { id: 'home', label: 'ہوم', roles: ['farmer', 'officer'] },
  { id: 'chatbot', label: 'AI چیٹ بوٹ', roles: ['farmer', 'officer'] },
  { id: 'prediction', label: 'فصل کی پیش گوئی', roles: ['farmer', 'officer'] },
  { id: 'fieldMonitoring', label: 'کھیت کی پروجیکشن', roles: ['farmer'] },
  { id: 'officerDashboard', label: 'افسر ڈیش بورڈ', icon: '‍', roles: ['officer'] },
];

export default function Sidebar({ open, onClose, navigate, currentScreen, userRole, onLogout }) {
  const visibleItems = navItems.filter((i) => i.roles.includes(userRole));

  return (
    <>
      {open && (
        <div onClick={onClose} className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[200]" />
      )}

      <div
        className={`fixed top-0 right-0 bottom-0 w-[280px] bg-white z-[300] flex flex-col border-l border-slate-200 transition-transform duration-300 ease-out ${
          open ? 'translate-x-0 shadow-2xl' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-br from-green-700 to-green-900 text-white">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={onClose}
              className="bg-white/20 border-none text-white w-8 h-8 rounded-full flex items-center justify-center text-lg"
            >
              
            </button>
            <span className="text-2xl"></span>
          </div>
          <div className="urdu-lg font-bold">کسان ساتھی</div>
          <div className="urdu-sm text-white/80 mt-1">AI زرعی معاون نظام</div>
          <div className="mt-3 px-3 py-2 bg-white/15 rounded-lg flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-base">
              {userRole === 'officer' ? '‍' : '‍'}
            </div>
            <div>
              <div className="urdu-sm text-white font-semibold">
                {userRole === 'officer' ? 'زرعی افسر' : 'کسان صارف'}
              </div>
              <div className="text-white/70 text-[11px]">Punjab, Pakistan</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 overflow-y-auto">
          <div className="urdu-sm px-5 py-2 text-slate-400 text-[11px] tracking-wide">مین مینو</div>
          {visibleItems.map((item) => {
            const active = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`w-full flex items-center gap-3.5 px-5 py-3 text-right transition-colors border-r-[3px] ${
                  active
                    ? 'bg-gradient-to-l from-green-50 to-green-100 border-green-600 text-green-700'
                    : 'border-transparent text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className={`urdu flex-1 text-sm ${active ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={onLogout}
            className="w-full py-2.5 px-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center gap-2 text-red-600 font-semibold"
          >
            <span className="urdu text-sm">لاگ آؤٹ</span>
            <span></span>
          </button>
          <div className="urdu-sm text-center mt-2.5 text-slate-400 text-[11px]">کسان ساتھی v2.0 — Crop2X</div>
        </div>
      </div>
    </>
  );
}
