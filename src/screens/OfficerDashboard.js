import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const farmers = [
  { id: 1, name: 'محمد اکرم', village: 'چک 45 شیخوپورہ', area: '3.2 ہیکٹر', ndvi: 0.72, health: 84, status: 'good', lastVisit: '3 دن پہلے', alerts: 1, pos: { x: 46, y: 22 } },
  { id: 2, name: 'عبدالرحمن', village: 'فتح پور فیصل آباد', area: '2.8 ہیکٹر', ndvi: 0.51, health: 62, status: 'warning', lastVisit: '7 دن پہلے', alerts: 3, pos: { x: 34, y: 40 } },
  { id: 3, name: 'سلطان محمود', village: 'بستی احمد ساہیوال', area: '4.1 ہیکٹر', ndvi: 0.85, health: 91, status: 'excellent', lastVisit: 'آج', alerts: 0, pos: { x: 40, y: 58 } },
  { id: 4, name: 'غلام مصطفیٰ', village: 'چک 22 اوکاڑہ', area: '1.9 ہیکٹر', ndvi: 0.38, health: 45, status: 'critical', lastVisit: '14 دن پہلے', alerts: 5, pos: { x: 50, y: 68 } },
  { id: 5, name: 'عمران خاور', village: 'بوریوالہ ویہاڑی', area: '3.7 ہیکٹر', ndvi: 0.68, health: 78, status: 'good', lastVisit: '1 دن پہلے', alerts: 0, pos: { x: 44, y: 80 } },
];

const weeklyData = [
  { day: 'پیر', queries: 24, alerts: 5 },
  { day: 'منگل', queries: 31, alerts: 3 },
  { day: 'بدھ', queries: 19, alerts: 8 },
  { day: 'جمعرات', queries: 42, alerts: 2 },
  { day: 'جمعہ', queries: 38, alerts: 4 },
  { day: 'ہفتہ', queries: 15, alerts: 1 },
  { day: 'اتوار', queries: 12, alerts: 0 },
];

const statusConfig = {
  excellent: { label: 'عمدہ', text: 'text-green-800', bg: 'bg-green-50', border: 'border-green-200' },
  good: { label: 'اچھا', text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
  warning: { label: 'انتباہ', text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  critical: { label: 'خطرناک', text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
};

function NdviBar({ val }) {
  const pct = Math.round(val * 100);
  const barColor = val < 0.4 ? 'bg-red-500' : val < 0.6 ? 'bg-amber-500' : 'bg-green-500';
  const textColor = val < 0.4 ? 'text-red-500' : val < 0.6 ? 'text-amber-500' : 'text-green-500';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${barColor} rounded-full`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`text-xs font-bold ${textColor} min-w-[36px]`}>{val.toFixed(2)}</span>
    </div>
  );
}

const pinColor = {
  excellent: '#15803d',
  good: '#16a34a',
  warning: '#f59e0b',
  critical: '#dc2626',
};

export default function OfficerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [sortBy, setSortBy] = useState('status');

  const sorted = [...farmers].sort((a, b) => {
    if (sortBy === 'status') {
      const order = { critical: 0, warning: 1, good: 2, excellent: 3 };
      return order[a.status] - order[b.status];
    }
    if (sortBy === 'ndvi') return a.ndvi - b.ndvi;
    return 0;
  });

  const criticalCount = farmers.filter((f) => f.status === 'critical').length;
  const warningCount = farmers.filter((f) => f.status === 'warning').length;
  const avgHealth = Math.round(farmers.reduce((s, f) => s + f.health, 0) / farmers.length);
  const totalAlerts = farmers.reduce((s, f) => s + f.alerts, 0);

  return (
    <div className="p-5 max-w-[760px] mx-auto pb-10" dir="rtl">
      <div className="mb-4.5">
        <h2 className="urdu-xl font-bold text-slate-800">‍ افسر ڈیش بورڈ</h2>
        <p className="urdu-sm text-slate-500">پنجاب زرعی ضلع — کسان مانیٹرنگ نظام</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-2.5 mb-5">
        {[
          { label: 'کل کسان', value: farmers.length, icon: '‍', color: 'text-blue-600' },
          { label: 'اوسط صحت', value: `${avgHealth}%`, icon: '', color: 'text-green-600' },
          { label: 'انتباہ', value: warningCount + criticalCount, icon: '', color: 'text-amber-600' },
          { label: 'کل الرٹ', value: totalAlerts, icon: '', color: 'text-red-600' },
        ].map((k, i) => (
          <div key={i} className="bg-white border-[1.5px] border-slate-100 rounded-2xl px-2.5 py-3 text-center shadow-card">
            <div className="text-xl mb-1.5">{k.icon}</div>
            <div className={`text-lg font-extrabold ${k.color}`}>{k.value}</div>
            <div className="urdu-sm text-[10px] text-slate-500">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl mb-4 gap-1">
        {[
          { id: 'overview', label: 'جائزہ', icon: '' },
          { id: 'farmers', label: 'کسان فہرست', icon: '‍' },
          { id: 'map', label: 'ہیٹ میپ', icon: '' },
          { id: 'analytics', label: 'تجزیہ', icon: '' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === t.id ? 'bg-white shadow-card' : ''
            }`}
          >
            <span className="text-base">{t.icon}</span>
            <span className={`urdu-sm text-[11px] ${activeTab === t.id ? 'text-green-700 font-bold' : 'text-slate-500'}`}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Overview tab */}
      {activeTab === 'overview' && (
        <div className="bg-red-50 border-[1.5px] border-red-200 rounded-2xl px-4.5 py-4 mb-4">
          <h3 className="urdu font-bold text-red-700 text-sm mb-2.5"> فوری توجہ درکار</h3>
          {farmers
            .filter((f) => f.status === 'critical' || f.status === 'warning')
            .map((f) => (
              <div key={f.id} className="flex justify-between items-center py-2.5 border-b border-red-200 last:border-0">
                <div className="flex gap-2.5 items-center">
                  {f.alerts > 0 && (
                    <div className="min-w-[22px] h-[22px] rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center">
                      {f.alerts}
                    </div>
                  )}
                  <div className="text-[13px] text-slate-600">{f.ndvi.toFixed(2)} NDVI</div>
                </div>
                <div className="text-right">
                  <div className="urdu font-bold text-sm text-slate-800">{f.name}</div>
                  <div className="urdu-sm text-xs text-slate-500">{f.village}</div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Farmers list */}
      {activeTab === 'farmers' && (
        <div>
          <div className="flex gap-2 mb-3.5 justify-end">
            <span className="urdu-sm text-slate-500 self-center text-xs">ترتیب:</span>
            {[{ val: 'status', label: 'حالت' }, { val: 'ndvi', label: 'NDVI' }].map((s) => (
              <button
                key={s.val}
                onClick={() => setSortBy(s.val)}
                className={`urdu px-3.5 py-1.5 rounded-full text-xs border-[1.5px] ${
                  sortBy === s.val ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-200 bg-white text-slate-500'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2.5">
            {sorted.map((f) => {
              const cfg = statusConfig[f.status];
              const isSelected = selectedFarmer === f.id;
              return (
                <div
                  key={f.id}
                  onClick={() => setSelectedFarmer(isSelected ? null : f.id)}
                  className={`bg-white border-[1.5px] rounded-2xl px-4.5 py-4 cursor-pointer transition-all ${
                    isSelected ? `${cfg.border} shadow-floaty` : 'border-slate-100 shadow-card'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2.5">
                      {f.alerts > 0 && (
                        <div className="min-w-[22px] h-[22px] rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center">
                          {f.alerts}
                        </div>
                      )}
                      <div>
                        <div className="text-[11px] text-slate-400">آخری دورہ: {f.lastVisit}</div>
                        <div className="text-xs text-slate-500">{f.area}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="urdu font-bold text-[15px] text-slate-800">{f.name}</div>
                      <div className="urdu-sm text-xs text-slate-500">{f.village}</div>
                      <div className={`inline-flex px-2.5 py-0.5 rounded-full mt-1 border ${cfg.bg} ${cfg.border}`}>
                        <span className={`urdu-sm text-[11px] font-bold ${cfg.text}`}>{cfg.label}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <NdviBar val={f.ndvi} />
                  </div>

                  {isSelected && (
                    <div className="mt-3.5 pt-3.5 border-t border-slate-100">
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {[
                          { label: 'فصل صحت', value: `${f.health}%` },
                          { label: 'NDVI', value: f.ndvi.toFixed(3) },
                          { label: 'رقبہ', value: f.area },
                          { label: 'الرٹ', value: `${f.alerts} انتباہ` },
                        ].map((d, i) => (
                          <div key={i} className="px-3 py-2 bg-slate-50 rounded-lg flex justify-between">
                            <span className="text-xs text-slate-600 font-semibold">{d.value}</span>
                            <span className="urdu-sm text-[11px] text-slate-500">{d.label}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button className="urdu flex-1 py-2.5 bg-green-600 text-white rounded-lg text-[13px]">پیغام بھیجیں </button>
                        <button className="urdu flex-1 py-2.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-[13px]">دورہ شیڈول </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Heat map — admin/officer view of crop health across the district */}
      {activeTab === 'map' && (
        <div className="bg-white rounded-[20px] p-4 border-[1.5px] border-slate-100 shadow-card">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="text-right">
              <h3 className="urdu font-bold text-sm text-slate-700">پنجاب — فصل صحت ہیٹ میپ</h3>
              <p className="urdu-sm text-[11px] text-slate-400">سرخ علاقوں پر فوری توجہ، سبز علاقے بہتر حالت میں</p>
            </div>
            <div className="urdu-sm px-2.5 py-1 rounded-full bg-slate-50 text-slate-500 text-[10px]">افسر ویو</div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 p-3">
            <div className="grid grid-cols-5 gap-1.5 aspect-[5/4]">
              {[
                ['#166534', 91, 'بہترین'], ['#22c55e', 84, 'اچھا'], ['#facc15', 68, 'انتباہ'], ['#16a34a', 88, 'اچھا'], ['#15803d', 94, 'بہترین'],
                ['#22c55e', 81, 'اچھا'], ['#f59e0b', 62, 'انتباہ'], ['#ef4444', 45, 'خطرناک'], ['#eab308', 57, 'انتباہ'], ['#16a34a', 79, 'اچھا'],
                ['#15803d', 90, 'بہترین'], ['#22c55e', 76, 'اچھا'], ['#facc15', 65, 'انتباہ'], ['#ef4444', 49, 'خطرناک'], ['#16a34a', 82, 'اچھا'],
                ['#22c55e', 78, 'اچھا'], ['#f59e0b', 59, 'انتباہ'], ['#ef4444', 42, 'خطرناک'], ['#facc15', 70, 'انتباہ'], ['#15803d', 92, 'بہترین'],
              ].map(([color, health, label], i) => (
                <button
                  key={i}
                  className="relative rounded-lg min-h-0 flex flex-col items-center justify-center text-white/95 transition-transform hover:scale-[1.03]"
                  style={{ backgroundColor: color }}
                  title={`${label} — ${health}%`}
                >
                  <span className="text-[11px] font-bold">{health}%</span>
                  <span className="urdu-sm text-[8px] leading-tight opacity-90">{label}</span>
                </button>
              ))}
            </div>

            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
              <div className="border-t border-white/80" />
            </div>
          </div>

          <div className="mt-3.5">
            <div className="urdu-sm text-[11px] text-slate-500 mb-2 text-right">فصل صحت کی سطح</div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'بہترین', range: '80–100%', color: 'bg-green-700' },
                { label: 'اچھا', range: '70–79%', color: 'bg-green-500' },
                { label: 'انتباہ', range: '50–69%', color: 'bg-amber-400' },
                { label: 'خطرناک', range: '0–49%', color: 'bg-red-500' },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <span className={`w-3 h-3 rounded-sm ${l.color}`} />
                  <div className="text-right">
                    <div className="urdu-sm text-[10px] text-slate-600 font-semibold">{l.label}</div>
                    <div className="text-[9px] text-slate-400">{l.range}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: 'اچھی حالت', value: '3', color: 'text-green-600' },
              { label: 'توجہ درکار', value: '1', color: 'text-amber-600' },
              { label: 'فوری کارروائی', value: '1', color: 'text-red-600' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-slate-50 px-2 py-2.5 text-center">
                <div className={`text-lg font-extrabold ${s.color}`}>{s.value}</div>
                <div className="urdu-sm text-[9px] text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics tab */}
      {activeTab === 'analytics' && (
        <div>
          <div className="bg-white rounded-[20px] p-4.5 border-[1.5px] border-slate-100 mb-4 shadow-card">
            <h3 className="urdu font-bold text-sm text-slate-700 mb-3.5">ہفتہ وار AI سوالات اور الرٹ</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fontFamily: 'Noto Nastaliq Urdu' }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="queries" name="سوالات" fill="#16a34a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="alerts" name="الرٹ" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'اس ہفتے سوالات', value: '181', icon: '', color: 'text-green-600' },
              { label: 'حل شدہ الرٹ', value: '18', icon: '', color: 'text-blue-600' },
              { label: 'زیر التواء دورے', value: '3', icon: '', color: 'text-amber-600' },
              { label: 'AI درستگی', value: '89%', icon: '', color: 'text-violet-600' },
            ].map((s, i) => (
              <div key={i} className="bg-white border-[1.5px] border-slate-100 rounded-2xl px-3.5 py-4 text-center">
                <div className="text-3xl mb-1.5">{s.icon}</div>
                <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div>
                <div className="urdu-sm text-[11px] text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
