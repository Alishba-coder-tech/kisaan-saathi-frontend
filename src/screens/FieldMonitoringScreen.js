import React, { useState } from 'react';

// Simple ordinal sections (not compass/geographic names) so this reads as
// "a picture of your field", not a map. Each section is drawn as a little
// patch of crop rows tinted by health — a projection, not a data grid.
function buildSections(mode) {
  return [
    { id: 's1', label: 'پہلا حصہ', status: 'good' },
    { id: 's2', label: 'دوسرا حصہ', status: mode === 'current' ? 'bad' : 'warning' },
    { id: 's3', label: 'تیسرا حصہ', status: mode === 'current' ? 'warning' : 'good' },
  ];
}

const statusStyle = {
  good: {
    label: 'اچھا',
    face: '',
    plant: 'گنا',
    tint: 'from-green-100 to-green-200',
    ring: 'ring-green-600',
    chip: 'bg-green-100 text-green-700',
    advice: 'کوئی اقدام درکار نہیں — فصل ٹھیک بڑھ رہی ہے۔',
  },
  warning: {
    label: 'تھوڑی توجہ',
    face: '',
    plant: 'گنا',
    tint: 'from-amber-100 to-amber-200',
    ring: 'ring-amber-500',
    chip: 'bg-amber-100 text-amber-700',
    advice: 'نمی چیک کریں — 2 دن میں دوبارہ دیکھیں۔',
  },
  bad: {
    label: 'توجہ درکار',
    face: '',
    plant: 'گنا',
    tint: 'from-red-100 to-red-200',
    ring: 'ring-red-500',
    chip: 'bg-red-100 text-red-700',
    advice: 'فوری آبپاشی کریں — اس حصے میں پانی کم ہے۔',
  },
};

const fields = [
  { id: 'F1', name: 'کھیت الف — شیخوپورہ', area: '3.2 ہیکٹر', crop: 'گنا', health: 84 },
  { id: 'F2', name: 'کھیت ب — فیصل آباد', area: '2.8 ہیکٹر', crop: 'گنا', health: 72 },
  { id: 'F3', name: 'کھیت ج — ساہیوال', area: '4.1 ہیکٹر', crop: 'گنا', health: 91 },
];

export default function FieldMonitoringScreen() {
  const [mode, setMode] = useState('current');
  const [selectedField, setSelectedField] = useState('F1');
  const [selectedSection, setSelectedSection] = useState(null);

  const sections = buildSections(mode);
  const field = fields.find((f) => f.id === selectedField);
  const active = sections.find((s) => s.id === selectedSection);

  return (
    <div className="p-5 max-w-[720px] mx-auto pb-10" dir="rtl">
      {/* Header */}
      <div className="mb-4">
        <h2 className="urdu-xl font-bold text-slate-800"> آپ کے کھیت کی پروجیکشن</h2>
        <p className="urdu-sm text-slate-500">آج کی حالت اور 2 ہفتے بعد کی متوقع حالت</p>
      </div>

      {/* Field selector */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {fields.map((f) => (
          <button
            key={f.id}
            onClick={() => { setSelectedField(f.id); setSelectedSection(null); }}
            className={`flex-shrink-0 px-3.5 py-2.5 rounded-xl text-right transition-all border-2 ${
              selectedField === f.id ? 'border-green-600 bg-green-50' : 'border-slate-200 bg-white'
            }`}
          >
            <div className={`urdu-sm text-xs font-bold ${selectedField === f.id ? 'text-green-700' : 'text-slate-600'}`}>
              {f.name}
            </div>
            <div className="text-[11px] text-slate-400">{f.area}</div>
          </button>
        ))}
      </div>

      {/* Field stats */}
      <div className="bg-white rounded-2xl px-4 py-3.5 border-[1.5px] border-slate-100 shadow-card mb-4 flex items-center justify-between">
        <div className="flex gap-6">
          {[
            { label: 'صحت', value: `${field.health}%`, color: field.health > 80 ? 'text-green-600' : 'text-amber-600' },
            { label: 'رقبہ', value: field.area, color: 'text-blue-600' },
            { label: 'فصل', value: field.crop, color: 'text-slate-700' },
          ].map((s, i) => (
            <div key={i}>
              <div className={`text-base font-extrabold ${s.color}`}>{s.value}</div>
              <div className="urdu-sm text-[10px] text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
        <div className={`urdu px-3 py-1.5 rounded-full text-xs font-bold ${field.health > 80 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
          {field.health > 80 ? ' صحتمند' : ' توجہ درکار'}
        </div>
      </div>

      {/* Mode toggle: current vs 2-week projection */}
      <div className="flex bg-slate-100 p-1 rounded-xl mb-4 gap-1">
        {[
          { id: 'current', label: 'آج کی حالت', icon: '' },
          { id: 'predicted', label: '2 ہفتے بعد کی پروجیکشن', icon: '' },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => { setMode(m.id); setSelectedSection(null); }}
            className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
              mode === m.id ? 'bg-white shadow-card' : ''
            }`}
          >
            <span className="text-base">{m.icon}</span>
            <span className={`urdu-sm text-xs ${mode === m.id ? 'text-green-700 font-bold' : 'text-slate-500'}`}>{m.label}</span>
          </button>
        ))}
      </div>

      {/* Illustrated field projection — rows of crop, not a geographic map */}
      <div className="bg-gradient-to-b from-sky-100 to-amber-50 rounded-[24px] p-4 border-[1.5px] border-slate-100 shadow-card mb-4 overflow-hidden">
        <div className="urdu font-bold text-sm text-slate-700 mb-3 text-center">
          {mode === 'current' ? ' آج آپ کے کھیت کی حالت' : ' 2 ہفتے بعد گنے کے کھیت کی متوقع حالت'}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {sections.map((sec) => {
            const s = statusStyle[sec.status];
            const isSel = selectedSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setSelectedSection(isSel ? null : sec.id)}
                className={`relative rounded-2xl bg-gradient-to-b ${s.tint} pt-3 pb-2 px-1 flex flex-col items-center transition-transform ${
                  isSel ? `ring-4 ${s.ring} scale-[1.04]` : ''
                }`}
              >
                {/* crop rows illustration */}
                <div className="grid grid-cols-2 gap-x-1 gap-y-0.5 mb-1.5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span key={i} className="relative flex items-end justify-center w-7 h-12">
                      <span className="absolute bottom-0 w-1.5 h-10 rounded-full bg-green-700" />
                      <span className="absolute bottom-3 -left-0.5 w-3 h-1.5 rounded-full bg-green-500 -rotate-25" />
                      <span className="absolute bottom-5 right-0 w-3 h-1.5 rounded-full bg-green-600 rotate-25" />
                      <span className="absolute bottom-7 -left-0.5 w-3 h-1.5 rounded-full bg-green-600 -rotate-25" />
                    </span>
                  ))}
                </div>
                {/* big face badge */}
                <div className="text-3xl mb-1">{s.face}</div>
                <span className="urdu-sm text-slate-700 text-xs font-bold">{sec.label}</span>
                <span className={`urdu-sm text-[10px] mt-0.5 px-2 py-0.5 rounded-full ${s.chip}`}>{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Plain 3-level legend */}
        <div className="flex justify-center gap-4 mt-4">
          {Object.entries(statusStyle).map(([key, s]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className="text-base">{s.face}</span>
              <span className="urdu-sm text-xs text-slate-600">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Tap-to-see advice for the selected section */}
        {active && (
          <div className={`mt-4 rounded-xl px-4 py-3 ${statusStyle[active.status].chip}`}>
            <div className="urdu font-bold text-sm mb-0.5">{active.label}</div>
            <div className="urdu-sm text-sm">{statusStyle[active.status].advice}</div>
          </div>
        )}
      </div>

      {/* Simple action list */}
      <div className="bg-white rounded-[20px] px-4 py-4 border-[1.5px] border-slate-100 shadow-card">
        <h3 className="urdu font-bold text-sm text-slate-700 mb-3">آج کیا کریں</h3>
        <div className="space-y-2">
          {[
            { icon: '', text: 'دوسرا حصہ — فوری آبپاشی کریں', tone: 'bg-red-50 border-red-200 text-red-700' },
            { icon: '', text: 'تیسرا حصہ — 2 دن بعد دوبارہ چیک کریں', tone: 'bg-amber-50 border-amber-200 text-amber-700' },
            { icon: '', text: 'پہلا حصہ بہترین حالت میں ہے', tone: 'bg-green-50 border-green-200 text-green-700' },
          ].map((a, i) => (
            <div key={i} className={`urdu-sm flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-sm ${a.tone}`}>
              <span className="text-lg">{a.icon}</span>
              <span>{a.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
