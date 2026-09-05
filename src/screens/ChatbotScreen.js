import React, { useState, useRef, useEffect } from 'react';

const CANNED = {
  'گنے': 'گنے کی موجودہ نشوونما بہترین ہے۔ فصل صحت مند ہے اور اچھی حالت میں بڑھ رہی ہے۔ آئندہ 2 ہفتوں میں پیداوار 61 ٹن فی ہیکٹر متوقع ہے۔ کیا آپ مزید تفصیل چاہتے ہیں؟',
  'پانی': 'موجودہ زمینی نمی 68% ہے — یہ گنے کے لیے مناسب ہے۔ تاہم بدھ کو بارش متوقع ہے، اس لیے آبپاشی فی الحال بند رکھیں۔ اگلی آبپاشی جمعہ کو کریں۔',
  'کھاد': 'گنے کے لیے اس مرحلے پر نائٹروجن کی ضرورت ہے۔ یوریا 50 کلو فی ایکڑ ڈالیں۔ پوٹاش بھی مفید ہے — 25 کلو فی ایکڑ۔ بارش کے بعد استعمال کریں تاکہ ضیاع نہ ہو۔',
  'موسم': 'آئندہ 7 دن: پیر اور منگل خشک، بدھ اور جمعرات بارش (12mm تک)، جمعہ سے اتوار گرم اور خشک۔ درجہ حرارت 27 سے 34 ڈگری رہے گا۔',
  'بیماری': 'آپ کے کھیت میں ابھی کوئی بیماری نہیں پائی گئی۔ مشرقی علاقے میں کچھ کمی ہے جو پانی کی کمی کی علامت ہو سکتی ہے — بیماری نہیں۔ اگر پتے پیلے ہوں تو فوری اطلاع دیں۔',
  'کٹائی': 'متوقع کٹائی 45 دن بعد — نومبر کے وسط میں۔ گنا 12 سے 14 فٹ لمبا ہونا چاہیے۔ ابھی سبز پتے کاٹ دیں تاکہ توانائی تنے میں جائے۔',
  'ذخیرہ': 'کٹائی کے بعد گنا 24 گھنٹے کے اندر کارخانے پہنچانا ضروری ہے۔ زیادہ دیر رکھنے سے شکر کی مقدار کم ہوتی ہے۔ سایہ دار جگہ پر رکھیں اور نمی سے بچائیں۔',
};

const GREETINGS = ['السلام علیکم', 'ہیلو', 'سلام', 'ہاں', 'ٹھیک ہے', 'شکریہ'];
const GREETING_REPLY = 'وعلیکم السلام! میں کسان ساتھی AI ہوں۔ آپ گنے کی فصل، موسم، کھاد، پانی، یا کٹائی کے بارے میں پوچھ سکتے ہیں۔';
const DEFAULT_REPLY = 'میں نے آپ کا سوال سمجھ لیا۔ ابھی آپ کے کھیت کا ڈیٹا تجزیہ کر رہا ہوں... براہ کرم گنا، پانی، کھاد، موسم، بیماری، کٹائی، یا ذخیرہ کے بارے میں پوچھیں۔';

const suggestedQs = [
  'گنے کی صحت کیسی ہے؟',
  'پانی کب دینا ہے؟',
  'کھاد کی ضرورت ہے؟',
  'موسم کیسا رہے گا؟',
  'کٹائی کب کریں؟',
  'بیماری کا خطرہ ہے؟',
];

function getReply(msg) {
  for (const [key, val] of Object.entries(CANNED)) {
    if (msg.includes(key)) return val;
  }
  if (GREETINGS.some((g) => msg.includes(g))) return GREETING_REPLY;
  return DEFAULT_REPLY;
}

export default function ChatbotScreen() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      text: 'السلام علیکم! میں کسان ساتھی AI ہوں \nآپ کے گنے کے کھیت کا تجزیہ تیار ہے۔ آواز میں بولیں یا ٹائپ کریں — میں اردو میں مدد کروں گا۔',
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), role: 'user', text: text.trim(), time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const reply = getReply(text);
      setTyping(false);
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'bot', text: reply, time: new Date() }]);
    }, 900 + Math.random() * 600);
  };

  const toggleVoice = () => {
    setListening((l) => {
      if (!l) {
        setTimeout(() => {
          setListening(false);
          sendMessage('گنے کی صحت کیسی ہے؟');
        }, 2500);
      }
      return !l;
    });
  };

  const fmt = (d) => d.toLocaleTimeString('ur-PK', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex flex-col h-[calc(100vh-60px)] max-w-[680px] mx-auto" dir="rtl">
      {/* Header */}
      <div className="px-5 py-3.5 bg-white border-b border-slate-100 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="urdu-sm text-xs text-green-700">آن لائن</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div>
            <div className="urdu font-bold text-sm text-slate-800">کسان ساتھی AI</div>
            <div className="urdu-sm text-[11px] text-slate-400">CrewAI + Claude API</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center text-xl">
            
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2 flex flex-col gap-3">
        {messages.length <= 1 && (
          <div className="mb-2">
            <p className="urdu-sm text-slate-500 text-xs mb-2.5 text-center">ابھی پوچھیں</p>
            <div className="flex flex-wrap gap-2 justify-end">
              {suggestedQs.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="urdu px-3.5 py-1.5 bg-white border-[1.5px] border-green-200 rounded-full text-sm text-green-700 hover:bg-green-50 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row' : 'flex-row-reverse'}`}>
            <div
              className={`w-8.5 h-8.5 rounded-full flex-shrink-0 flex items-center justify-center text-base ${
                msg.role === 'bot' ? 'bg-gradient-to-br from-green-600 to-green-800' : 'bg-gradient-to-br from-indigo-500 to-indigo-700'
              }`}
            >
              {msg.role === 'bot' ? '' : '‍'}
            </div>
            <div className="max-w-[72%]">
              <div
                className={`px-4 py-3 shadow-sm ${
                  msg.role === 'bot'
                    ? 'bg-white text-slate-800 border border-slate-100 rounded-[18px] rounded-br-[4px]'
                    : 'bg-gradient-to-br from-green-600 to-green-800 text-white rounded-[18px] rounded-bl-[4px]'
                }`}
              >
                <p className="urdu text-sm whitespace-pre-line">{msg.text}</p>
              </div>
              <div className={`text-[10px] text-slate-400 mt-1 ${msg.role === 'bot' ? 'text-right' : 'text-left'}`}>{fmt(msg.time)}</div>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex flex-row-reverse items-end gap-2">
            <div className="w-8.5 h-8.5 rounded-full bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center text-base flex-shrink-0">
              
            </div>
            <div className="px-4.5 py-3.5 bg-white rounded-[18px] rounded-br-[4px] border border-slate-100 shadow-sm flex gap-1.5 items-center">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-green-400 animate-bounceDot" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {listening && (
        <div className="mx-4 mb-2 px-4.5 py-3.5 bg-red-50 border-[1.5px] border-red-200 rounded-2xl flex items-center justify-between">
          <span className="urdu-sm text-red-600 text-sm">سن رہا ہوں... اردو میں بولیں</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-1 rounded-sm bg-red-500 animate-waveBar"
                style={{ height: `${8 + Math.random() * 16}px`, animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Input bar */}
      <div className="px-4 pt-3 pb-4 bg-white border-t border-slate-100 flex gap-2.5 items-center">
        <button
          onClick={toggleVoice}
          className={`w-11.5 h-11.5 rounded-full flex-shrink-0 flex items-center justify-center text-xl text-white transition-all ${
            listening ? 'bg-gradient-to-br from-red-500 to-red-600 ring-4 ring-red-300' : 'bg-gradient-to-br from-green-500 to-green-700'
          }`}
        >
          {listening ? '⏹' : ''}
        </button>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
          placeholder="اردو میں ٹائپ کریں..."
          dir="rtl"
          className="urdu flex-1 px-4 py-3 rounded-full border-[1.5px] border-slate-200 bg-slate-50 text-sm outline-none focus:border-green-400 transition-colors"
        />

        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim()}
          className={`w-11.5 h-11.5 rounded-full flex-shrink-0 flex items-center justify-center text-xl text-white transition-colors ${
            input.trim() ? 'bg-gradient-to-br from-green-600 to-green-800 cursor-pointer' : 'bg-slate-200 cursor-not-allowed'
          }`}
        >
          
        </button>
      </div>
    </div>
  );
}
