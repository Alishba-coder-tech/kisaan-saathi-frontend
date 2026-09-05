import React, { useState } from 'react';
import { Phone, Lock, Eye, EyeOff, Sprout, Mic, MessageCircle, ShieldCheck } from 'lucide-react';

export default function LoginScreen({ onLogin }) {
  const [role, setRole] = useState('farmer');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!phone || !password) {
      setError('براہ کرم تمام خانے پُر کریں');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(role);
    }, 1400);
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 sm:p-6 overflow-hidden" dir="rtl">
      {/* Background photo */}
      <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: "url('/farm-hero.png')" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-green-950/75 via-green-900/55 to-amber-900/40" />
      <div className="absolute inset-0 bg-black/10" />

      {/* floating leaf accents */}
      <span className="absolute top-10 left-8 text-4xl opacity-20 animate-pulse2"></span>
      <span className="absolute bottom-16 right-10 text-5xl opacity-15 animate-pulse2" style={{ animationDelay: '0.6s' }}></span>

      {/* Trust strip */}
      <div className="hidden sm:flex absolute top-6 left-1/2 -translate-x-1/2 z-10 items-center gap-5 bg-white/10 backdrop-blur px-5 py-2 rounded-full border border-white/20">
        {[
          { icon: Mic, label: 'آواز میں بات کریں' },
          { icon: MessageCircle, label: 'اردو معاونت' },
          { icon: ShieldCheck, label: 'محفوظ ڈیٹا' },
        ].map((t, i) => (
          <div key={i} className="flex items-center gap-1.5 text-white/90">
            <t.icon size={14} />
            <span className="urdu-sm text-[11px]">{t.label}</span>
          </div>
        ))}
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur rounded-[28px] shadow-2xl overflow-hidden border border-white/40">
        {/* Header */}
        <div className="bg-gradient-to-br from-green-700 to-green-900 px-8 pt-9 pb-7 text-center relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-amber-400/10" />
          <div className="relative">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/15 flex items-center justify-center border border-white/25">
              <Sprout className="text-green-100" size={30} />
            </div>
            <h1 className="urdu text-3xl font-bold text-white">کسان ساتھی</h1>
            <p className="urdu-sm text-white/85 text-sm mt-1">AI زرعی معاون نظام</p>
            <div className="mt-3 inline-flex items-center gap-2 bg-white/15 rounded-full px-3.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse2" />
              <span className="urdu-sm text-white/90 text-xs">Crop2X پاور ڈ</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="px-8 pt-7 pb-8">
          {/* Role toggle */}
          <div className="mb-6">
            <p className="urdu-sm text-slate-600 font-semibold mb-2.5">اپنا کردار منتخب کریں</p>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { val: 'farmer', label: 'کسان', icon: '‍', desc: 'فصل کی معلومات' },
                { val: 'officer', label: 'افسر', icon: '‍', desc: 'ڈیش بورڈ' },
              ].map((r) => (
                <button
                  key={r.val}
                  onClick={() => setRole(r.val)}
                  className={`p-3 rounded-2xl text-center border-2 transition-all ${
                    role === r.val ? 'border-green-600 bg-green-50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{r.icon}</div>
                  <div className={`urdu font-bold text-sm ${role === r.val ? 'text-green-700' : 'text-slate-600'}`}>{r.label}</div>
                  <div className="urdu-sm text-slate-400 text-[11px] leading-tight">{r.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="urdu-sm block mb-1.5 text-slate-700 font-semibold">موبائل نمبر</label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0300-0000000"
                dir="ltr"
                className="w-full px-4 py-3 pl-11 rounded-xl border-[1.5px] border-slate-200 bg-slate-50 text-[15px] text-left outline-none focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 transition-all"
              />
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="urdu-sm block mb-1.5 text-slate-700 font-semibold">پاس ورڈ</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="••••••••"
                dir="ltr"
                className="w-full px-4 py-3 pl-11 pr-11 rounded-xl border-[1.5px] border-slate-200 bg-slate-50 text-[15px] text-left outline-none focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 transition-all"
              />
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="urdu-sm bg-red-50 border border-red-200 text-red-600 px-3.5 py-2.5 rounded-lg mb-4 text-sm">{error}</div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`urdu w-full py-3.5 rounded-2xl text-white font-semibold text-base transition-all shadow-lg shadow-green-900/20 ${
              loading ? 'bg-slate-300 cursor-not-allowed shadow-none' : 'bg-gradient-to-br from-green-600 to-green-800 hover:brightness-110 active:scale-[0.99]'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2.5">
                <span className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                لاگ ان ہو رہا ہے...
              </span>
            ) : (
              'لاگ ان کریں'
            )}
          </button>

          <p className="urdu-sm text-center mt-4 text-slate-400 text-xs">ڈیمو: کوئی بھی نمبر اور پاس ورڈ درج کریں</p>
        </div>
      </div>
    </div>
  );
}
