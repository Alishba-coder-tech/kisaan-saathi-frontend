import React, { useState } from 'react';

const alerts = [
  { type: 'warning', icon: '', text: 'آئندہ 48 گھنٹوں میں بارش کا امکان — آبپاشی روکیں', time: '2 گھنٹے پہلے' },
  { type: 'success', icon: '', text: 'گنے کی فصل کی نشوونما معمول کے مطابق ہے', time: '5 گھنٹے پہلے' },
  { type: 'info', icon: '', text: 'کیڑے مار دوا کا وقت: اگلے 3 دن میں اسپرے کریں', time: '1 دن پہلے' },
];

const quickStats = [
  { label: 'فصل کی صحت', value: '84', unit: '%', icon: '', color: 'text-green-700', bg: 'bg-green-50', change: '+2%', up: true },
  { label: 'نمی زمین', value: '68', unit: '%', icon: '', color: 'text-blue-600', bg: 'bg-blue-50', change: '-2%', up: false },
  { label: 'درجہ حرارت', value: '31', unit: '°C', icon: '', color: 'text-amber-600', bg: 'bg-amber-50', change: '+1°', up: true },
  { label: 'مجموعی حالت', value: 'اچھی', unit: '', icon: '', color: 'text-green-600', bg: 'bg-green-50', change: '', up: true },
];

const quickActions = [
  { id: 'chatbot', label: 'AI سے پوچھیں', icon: '', desc: 'آواز یا ٹائپ کریں', bg: 'bg-green-50' },
  { id: 'prediction', label: 'پیشن گوئی', icon: '', desc: 'فصل کا مستقبل', bg: 'bg-blue-50' },
  { id: 'fieldMonitoring', label: 'کھیت کا نقشہ', icon: '', desc: 'آسان تصویری جائزہ', bg: 'bg-amber-50' },
  { id: 'officerDashboard', label: 'افسر پینل', icon: '', desc: 'رپورٹ اور اعداد', bg: 'bg-violet-50' },
];

export default function HomeScreen({ navigate, userRole }) {
  const [activeAlert, setActiveAlert] = useState(null);
  const now = new Date();
  const hours = now.getHours();
  const greeting = hours < 12 ? 'صبح بخیر' : hours < 17 ? 'سہ پہر بخیر' : 'شام بخیر';

  return (
    <div className="p-5 max-w-[680px] mx-auto pb-10" dir="rtl">
      {/* Greeting banner */}
      <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-[20px] px-6 py-5.5 mb-5 text-white relative overflow-hidden">
        <div className="absolute -top-5 -left-5 text-8xl opacity-10"></div>
        <div className="relative">
          <p className="urdu-sm text-white/80 text-sm mb-1">پنجاب، پاکستان — گنا کا موسم</p>
          <h2 className="urdu-xl font-bold text-white">
            {greeting}، {userRole === 'officer' ? 'افسر صاحب' : 'کسان بھائی'} 
          </h2>
          <div className="flex gap-4 mt-3">
            {[
              { v: '31°', l: 'درجہ حرارت' },
              { v: '', l: 'جزوی ابر' },
              { v: '68%', l: 'نمی' },
              { v: '4 km/h', l: 'ہوا' },
            ].map((s, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="w-px bg-white/20" />}
                <div className="text-center">
                  <div className="text-xl font-bold">{s.v}</div>
                  <div className="urdu-sm text-[11px] text-white/70">{s.l}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mb-5">
        <h3 className="urdu text-[15px] font-bold text-slate-700 mb-3">آج کا جائزہ</h3>
        <div className="grid grid-cols-2 gap-2.5">
          {quickStats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl px-4 py-3.5 border-[1.5px] border-slate-100 shadow-card flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center text-xl flex-shrink-0`}>{stat.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="urdu-sm text-slate-500 text-[11px]">{stat.label}</div>
                <div className="flex items-baseline gap-1">
                  <span className={`text-xl font-extrabold ${stat.color}`}>{stat.value}</span>
                  <span className="text-xs text-slate-400">{stat.unit}</span>
                </div>
                {stat.change && (
                  <div className={`text-[11px] font-semibold ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                    {stat.up ? '↑' : '↓'} {stat.change}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-5">
        <h3 className="urdu text-[15px] font-bold text-slate-700 mb-3">فوری اقدامات</h3>
        <div className="grid grid-cols-2 gap-2.5">
          {quickActions.map((a) => (
            <button
              key={a.id}
              onClick={() => navigate(a.id)}
              className="bg-white border-[1.5px] border-slate-100 rounded-2xl px-3.5 py-4 text-right shadow-card transition-all hover:-translate-y-0.5 hover:shadow-floaty"
            >
              <div className={`w-10.5 h-10.5 rounded-xl ${a.bg} flex items-center justify-center text-xl mb-2.5`}>{a.icon}</div>
              <div className="urdu font-bold text-sm text-slate-700">{a.label}</div>
              <div className="urdu-sm text-slate-400 text-[11px]">{a.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div>
        <h3 className="urdu text-[15px] font-bold text-slate-700 mb-3">تازہ اطلاعات </h3>
        <div className="flex flex-col gap-2.5">
          {alerts.map((alert, i) => {
            const borderColor =
              alert.type === 'warning' ? 'border-amber-200' : alert.type === 'success' ? 'border-green-200' : 'border-blue-200';
            return (
              <div
                key={i}
                onClick={() => setActiveAlert(activeAlert === i ? null : i)}
                className={`bg-white border-[1.5px] ${borderColor} rounded-2xl px-4 py-3.5 cursor-pointer transition-shadow ${
                  activeAlert === i ? 'shadow-floaty' : 'shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-xl flex-shrink-0">{alert.icon}</div>
                  <div className="flex-1">
                    <p className={`urdu-sm text-slate-700 text-sm ${activeAlert === i ? 'font-semibold' : ''}`}>{alert.text}</p>
                    <span className="text-[11px] text-slate-400">{alert.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Crop stage indicator */}
      <div className="mt-5 bg-white border-[1.5px] border-slate-100 rounded-[20px] px-5 py-4.5 shadow-card">
        <h3 className="urdu text-[15px] font-bold text-slate-700 mb-3.5">گنے کی نشوونما مرحلہ </h3>
        <div className="flex items-center mb-2.5">
          {['بیج بوائی', 'انکرت', 'نشوونما', 'پکنا', 'کٹائی'].map((stage, i) => (
            <React.Fragment key={i}>
              <div className="text-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full mx-auto mb-1.5 flex items-center justify-center text-sm text-white font-bold ${
                    i <= 2 ? 'bg-green-600' : i === 3 ? 'bg-amber-400 ring-4 ring-amber-300/50' : 'bg-slate-200'
                  }`}
                >
                  {i < 3 ? '' : i === 3 ? '●' : '○'}
                </div>
                <div className={`urdu-sm text-[9px] ${i <= 3 ? 'text-slate-700' : 'text-slate-400'}`}>{stage}</div>
              </div>
              {i < 4 && <div className={`h-0.5 flex-1 mb-5.5 ${i < 3 ? 'bg-green-500' : 'bg-slate-200'}`} />}
            </React.Fragment>
          ))}
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-lg px-3.5 py-2.5">
          <p className="urdu-sm text-amber-700 text-xs">⏳ ابھی پکنے کا مرحلہ — تخمینی کٹائی: 45 دن</p>
        </div>
      </div>
    </div>
  );
}
