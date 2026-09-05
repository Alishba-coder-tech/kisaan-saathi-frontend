import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Legend } from 'recharts';

const ndviData = [
  { week: 'ہفتہ 1', actual: 0.42, predicted: null },
  { week: 'ہفتہ 2', actual: 0.48, predicted: null },
  { week: 'ہفتہ 3', actual: 0.55, predicted: null },
  { week: 'ہفتہ 4', actual: 0.61, predicted: null },
  { week: 'ہفتہ 5', actual: 0.67, predicted: null },
  { week: 'ہفتہ 6', actual: 0.72, predicted: 0.72 },
  { week: 'ہفتہ 7', actual: null, predicted: 0.76 },
  { week: 'ہفتہ 8', actual: null, predicted: 0.79 },
  { week: 'ہفتہ 9', actual: null, predicted: 0.81 },
  { week: 'ہفتہ 10', actual: null, predicted: 0.80 },
  { week: 'ہفتہ 11', actual: null, predicted: 0.77 },
  { week: 'ہفتہ 12', actual: null, predicted: 0.73 },
];

const weatherData = [
  { day: 'پیر', temp: 32, rain: 0 },
  { day: 'منگل', temp: 30, rain: 5 },
  { day: 'بدھ', temp: 28, rain: 12 },
  { day: 'جمعرات', temp: 27, rain: 8 },
  { day: 'جمعہ', temp: 31, rain: 0 },
  { day: 'ہفتہ', temp: 33, rain: 0 },
  { day: 'اتوار', temp: 34, rain: 0 },
];

const yieldData = [
  { month: 'ستمبر', estimate: 48, optimal: 55 },
  { month: 'اکتوبر', estimate: 52, optimal: 55 },
  { month: 'نومبر', estimate: 58, optimal: 60 },
  { month: 'دسمبر', estimate: 61, optimal: 62 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 shadow-lg text-sm" dir="rtl">
        <p className="font-bold mb-1 text-slate-700">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>
            {p.name}: {typeof p.value === 'number' ? p.value.toFixed(2) : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function PredictionScreen() {
  const [activeTab, setActiveTab] = useState('ndvi');
  const [showDetails, setShowDetails] = useState(false);

  const tabs = [
    { id: 'ndvi', label: 'فصل کی نشوونما', icon: '' },
    { id: 'weather', label: 'موسمی پیشن گوئی', icon: '' },
    { id: 'yield', label: 'پیداوار تخمینہ', icon: '' },
  ];

  return (
    <div className="p-5 max-w-[720px] mx-auto pb-10" dir="rtl">
      <div className="mb-5">
        <h2 className="urdu-xl font-bold text-slate-800"> فصل پیشن گوئی</h2>
        <p className="urdu-sm text-slate-500">AI ماڈل بر اساس Crop2X ڈیٹا — گنا، پنجاب</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        {[
          { label: 'پیداوار اندازہ', value: '61 ٹن/ہیکٹر', icon: '', color: 'text-green-600' },
          { label: 'فصل صحت', value: '84%', icon: '', color: 'text-green-700' },
          { label: 'کٹائی', value: '45 دن', icon: '⏳', color: 'text-amber-600' },
        ].map((c, i) => (
          <div key={i} className="bg-white border-[1.5px] border-slate-100 rounded-2xl px-3 py-3.5 text-center shadow-card">
            <div className="text-2xl mb-1.5">{c.icon}</div>
            <div className={`text-base font-extrabold ${c.color}`}>{c.value}</div>
            <div className="urdu-sm text-[10px] text-slate-500">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 bg-slate-100 p-1.5 rounded-2xl mb-4.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 rounded-xl transition-all ${activeTab === tab.id ? 'bg-white shadow-card' : ''}`}
          >
            <div className="text-base mb-0.5">{tab.icon}</div>
            <div className={`urdu-sm text-[10px] ${activeTab === tab.id ? 'text-green-700 font-bold' : 'text-slate-500'}`}>{tab.label}</div>
          </button>
        ))}
      </div>

      {/* NDVI Chart */}
      {activeTab === 'ndvi' && (
        <div className="bg-white rounded-[20px] p-5 border-[1.5px] border-slate-100 shadow-card">
          <div className="mb-4">
            <h3 className="urdu font-bold text-slate-700 text-[15px]">فصل کی نشوونما کا گراف</h3>
            <p className="urdu-sm text-slate-400 text-xs">سبز = اصل ڈیٹا | نارنجی = AI پیشن گوئی</p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={ndviData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="ndviGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 10, fontFamily: 'Noto Nastaliq Urdu' }} />
              <YAxis domain={[0.3, 0.9]} tick={{ fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="actual" name="اصل نشوونما" stroke="#16a34a" strokeWidth={2.5} fill="url(#ndviGrad)" connectNulls={false} dot={{ r: 4, fill: '#16a34a' }} />
              <Area type="monotone" dataKey="predicted" name="پیش بینی" stroke="#f59e0b" strokeWidth={2} strokeDasharray="6 3" fill="url(#predGrad)" connectNulls dot={{ r: 4, fill: '#f59e0b' }} />
            </AreaChart>
          </ResponsiveContainer>

          <div className="mt-4 flex items-center gap-2 px-3.5 py-3 bg-green-50 rounded-xl">
            <div className="w-2.5 h-2.5 rounded-full bg-green-600" />
            <span className="urdu-sm text-sm text-green-700">فصل صحتمند ہے  — کوئی فوری فکر کی بات نہیں</span>
          </div>
        </div>
      )}

      {/* Weather Chart */}
      {activeTab === 'weather' && (
        <div className="bg-white rounded-[20px] p-5 border-[1.5px] border-slate-100 shadow-card">
          <h3 className="urdu font-bold text-slate-700 text-[15px] mb-1">7 دن موسم پیشن گوئی</h3>
          <p className="urdu-sm text-slate-400 text-xs mb-4">Crop2X ماڈل بر اساس تاریخی ڈیٹا</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weatherData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fontFamily: 'Noto Nastaliq Urdu' }} />
              <YAxis yAxisId="temp" tick={{ fontSize: 10 }} />
              <YAxis yAxisId="rain" orientation="left" tick={{ fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar yAxisId="rain" dataKey="rain" name="بارش (mm)" fill="#3b82f6" radius={[4, 4, 0, 0]} opacity={0.8} />
              <Line yAxisId="temp" type="monotone" dataKey="temp" name="درجہ حرارت °C" stroke="#ef4444" strokeWidth={2} dot={{ r: 4, fill: '#ef4444' }} />
            </BarChart>
          </ResponsiveContainer>

          <div className="flex gap-1.5 mt-4 overflow-x-auto pb-1">
            {weatherData.map((d, i) => (
              <div key={i} className={`flex-shrink-0 w-[72px] rounded-xl text-center px-1.5 py-2.5 border ${d.rain > 0 ? 'bg-blue-50 border-blue-100' : 'bg-amber-50 border-amber-100'}`}>
                <div className="urdu-sm text-[11px] text-slate-600 mb-1">{d.day}</div>
                <div className="text-2xl mb-1">{d.rain > 0 ? '' : ''}</div>
                <div className="text-sm font-bold text-slate-800">{d.temp}°</div>
                {d.rain > 0 && <div className="text-[10px] text-blue-600">{d.rain}mm</div>}
              </div>
            ))}
          </div>

          <div className="mt-3.5 px-3.5 py-2.5 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="urdu-sm text-amber-800 text-xs"> بدھ اور جمعرات کو بارش متوقع ہے — آبپاشی منسوخ کریں</p>
          </div>
        </div>
      )}

      {/* Yield Chart */}
      {activeTab === 'yield' && (
        <div className="bg-white rounded-[20px] p-5 border-[1.5px] border-slate-100 shadow-card">
          <h3 className="urdu font-bold text-slate-700 text-[15px] mb-1">پیداوار تخمینہ بمقابلہ بہترین</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={yieldData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fontFamily: 'Noto Nastaliq Urdu' }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={(v) => <span style={{ fontFamily: 'Noto Nastaliq Urdu', fontSize: 11 }}>{v === 'estimate' ? 'تخمینہ' : 'بہترین'}</span>} />
              <Bar dataKey="estimate" name="تخمینہ" fill="#16a34a" radius={[4, 4, 0, 0]} />
              <Bar dataKey="optimal" name="بہترین" fill="#bbf7d0" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-2 gap-2.5 mt-4">
            <div className="px-3.5 py-3 bg-green-50 rounded-xl border border-green-200">
              <div className="urdu-sm text-slate-500 text-[11px] mb-1">متوقع پیداوار</div>
              <div className="text-xl font-extrabold text-green-700">
                61 <span className="text-sm">ٹن/ہیکٹر</span>
              </div>
            </div>
            <div className="px-3.5 py-3 bg-blue-50 rounded-xl border border-blue-100">
              <div className="urdu-sm text-slate-500 text-[11px] mb-1">اعتماد کی سطح</div>
              <div className="text-xl font-extrabold text-blue-600">87%</div>
            </div>
          </div>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="urdu mt-3.5 w-full py-2.5 bg-green-600 text-white rounded-xl text-sm font-semibold"
          >
            {showDetails ? 'تفصیل چھپائیں' : 'مکمل تجزیہ دیکھیں'} {showDetails ? '▲' : '▼'}
          </button>

          {showDetails && (
            <div className="mt-3 px-3.5 py-3 bg-slate-50 rounded-xl">
              {[
                { label: 'AI ماڈل', value: 'LSTM Time-Series', icon: '' },
                { label: 'آخری تجزیہ', value: 'آج صبح 6 بجے', icon: '⏰' },
                { label: 'ڈیٹا ماخذ', value: 'Crop2X سیٹلائٹ', icon: '' },
                { label: 'موسم اثر', value: '-3% (بارش)', icon: '' },
              ].map((r, i) => (
                <div key={i} className={`flex justify-between items-center py-2 ${i < 3 ? 'border-b border-slate-200' : ''}`}>
                  <span className="text-[13px] text-slate-600">{r.value}</span>
                  <div className="flex items-center gap-2">
                    <span className="urdu-sm text-xs text-slate-600">{r.label}</span>
                    <span className="text-base">{r.icon}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
