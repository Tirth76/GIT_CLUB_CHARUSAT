import React, { useState } from 'react';
import { Play, Check, Sparkles, QrCode, Clock, RefreshCw, Send, CheckCircle2, ShieldCheck, Flame, ShoppingBag } from 'lucide-react';

export default function InteractiveSandbox({ project }) {
  const [demoType] = useState(project.interactiveDemoType || 'generic');

  // State for ExamSync Simulator
  const [rollNo, setRollNo] = useState('24CS084');
  const [examResult, setExamResult] = useState(null);

  // State for SmartEval AI Simulator
  const [selectedScript, setSelectedScript] = useState('q1');
  const [evaluating, setEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState(null);

  // State for BitePass Canteen Simulator
  const [cart, setCart] = useState([
    { id: 1, name: 'Paneer Kathi Roll', price: 70, qty: 1 },
    { id: 2, name: 'Cold Coffee (Large)', price: 50, qty: 1 }
  ]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderToken, setOrderToken] = useState(null);

  // State for PrepPulse AI Simulator
  const [company, setCompany] = useState('Crest Data Systems');
  const [interviewSubmitted, setInterviewSubmitted] = useState(false);
  const [userAnswer, setUserAnswer] = useState('I use two pointers starting from start and end of array to reverse in O(N) time and O(1) space.');

  // 1. Handle ExamSync Search
  const handleExamSearch = (e) => {
    e.preventDefault();
    if (!rollNo) return;
    const hash = rollNo.toUpperCase().charCodeAt(rollNo.length - 1) || 5;
    const floor = (hash % 3) + 1;
    const room = 200 + (hash % 12);
    const seat = (hash % 30) + 1;
    const bldg = rollNo.toUpperCase().includes('CS') ? 'CSPIT - Building A' : rollNo.toUpperCase().includes('IT') ? 'DEPSTAR - Block B' : 'CMPICA - Main Hall';
    
    setExamResult({
      studentName: 'Om Rashiya',
      rollNo: rollNo.toUpperCase(),
      building: bldg,
      floor: `Floor ${floor}`,
      room: `Hall ${room}`,
      seatNo: `Seat #${seat}`,
      examDate: 'Oct 12, 2026 — 10:00 AM',
      subject: 'Data Structures & Algorithms (CE204)'
    });
  };

  // 2. Handle SmartEval AI
  const handleRunAiEvaluation = () => {
    setEvaluating(true);
    setEvalResult(null);
    setTimeout(() => {
      setEvaluating(false);
      setEvalResult({
        score: selectedScript === 'q1' ? '9.2 / 10' : '8.5 / 10',
        ocrAccuracy: '98.4%',
        confidence: 'High (0.96)',
        extractedText: selectedScript === 'q1' 
          ? "Vision Transformer (ViT) splits an image into non-overlapping patches, flattens them, projects them linearly into embedding space, and feeds them into standard Transformer encoder with self-attention."
          : "TCP is connection-oriented with 3-way handshake ensuring reliable delivery, whereas UDP is connectionless, faster, with lower overhead used for streaming video.",
        feedback: [
          "✓ Correct mathematical explanation of patch embeddings",
          "✓ Proper diagram representation identified",
          "⚡ Minor detail: Could mention positional embeddings explicitly"
        ]
      });
    }, 1200);
  };

  // 3. Handle BitePass Order
  const handlePlaceOrder = () => {
    const token = `CP-${Math.floor(100 + Math.random() * 900)}`;
    setOrderToken(token);
    setOrderPlaced(true);
  };

  // 4. Handle PrepPulse Interview
  const handleEvaluateInterview = () => {
    setInterviewSubmitted(true);
  };

  if (demoType === 'exam-seating') {
    return (
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-indigo-500/30 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h4 className="text-base font-bold text-white font-heading">ExamSync Live Seating Allocation Simulator</h4>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Interactive Prototype
          </span>
        </div>

        <form onSubmit={handleExamSearch} className="flex gap-2">
          <input
            type="text"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            placeholder="Enter Student Roll No (e.g. 24CS084)"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-white" /> Find Seat
          </button>
        </form>

        {examResult && (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-950 border border-indigo-500/40 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-indigo-400 font-mono">Verified Student Pass</span>
                <h5 className="text-base font-bold text-white">{examResult.studentName} ({examResult.rollNo})</h5>
                <p className="text-xs text-slate-300">{examResult.subject}</p>
              </div>
              <div className="p-2 bg-white rounded-xl shadow-lg">
                <QrCode className="w-10 h-10 text-slate-950" />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-2">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Building</span>
                <span className="text-xs font-bold text-white">{examResult.building}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Hall / Floor</span>
                <span className="text-xs font-bold text-indigo-300">{examResult.room} ({examResult.floor})</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Allocated Bench</span>
                <span className="text-xs font-bold text-amber-400">{examResult.seatNo}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Status</span>
                <span className="text-xs font-bold text-emerald-400">Confirmed ✓</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (demoType === 'ai-evaluator') {
    return (
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h4 className="text-base font-bold text-white font-heading">SmartEval AI Answer Sheet Grading Simulator</h4>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Vision Transformer OCR
          </span>
        </div>

        <div className="space-y-3">
          <label className="text-xs text-slate-300 font-medium block">Select Sample Handwritten Answer Script:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedScript('q1')}
              className={`p-3 rounded-xl text-left border text-xs transition ${
                selectedScript === 'q1' ? 'bg-purple-950/60 border-purple-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <div className="font-bold">Q1. Vision Transformers Architecture</div>
              <div className="text-[11px] text-slate-400 mt-1">Mid-Term CE302 • 10 Marks</div>
            </button>

            <button
              onClick={() => setSelectedScript('q2')}
              className={`p-3 rounded-xl text-left border text-xs transition ${
                selectedScript === 'q2' ? 'bg-purple-950/60 border-purple-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <div className="font-bold">Q2. TCP vs UDP Protocol Differences</div>
              <div className="text-[11px] text-slate-400 mt-1">Mid-Term IT205 • 10 Marks</div>
            </button>
          </div>
        </div>

        <button
          onClick={handleRunAiEvaluation}
          disabled={evaluating}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition"
        >
          {evaluating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Running OCR & Transformer Evaluation...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Evaluate Script with SmartEval AI</span>
            </>
          )}
        </button>

        {evalResult && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-purple-400 font-mono">AI Evaluation Scorecard</span>
                <div className="text-xl font-extrabold text-white">{evalResult.score}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-mono">OCR Confidence</span>
                <span className="text-xs font-bold text-emerald-400">{evalResult.ocrAccuracy}</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 font-mono block mb-1">Extracted Student Text (OCR):</span>
              <p className="text-xs text-slate-200 p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono italic">
                "{evalResult.extractedText}"
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 font-mono block">Automated Feedback Rubric:</span>
              {evalResult.feedback.map((item, idx) => (
                <div key={idx} className="text-xs text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (demoType === 'canteen-order') {
    return (
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-blue-500/30 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-400" />
            <h4 className="text-base font-bold text-white font-heading">BitePass Canteen Pre-order & Queue Simulator</h4>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
            CSPIT Canteen
          </span>
        </div>

        {!orderPlaced ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-xs text-slate-300 font-medium block">Selected Items in Cart:</span>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <span className="font-bold text-white">{item.name}</span>
                  <span className="font-mono text-blue-400">₹{item.price}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-950/40 border border-blue-500/30">
              <span className="text-xs text-slate-300">Total Bill (UPI):</span>
              <span className="text-base font-bold text-white font-mono">₹120</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition"
            >
              <Check className="w-4 h-4" /> Place Pre-order & Generate Pickup Token
            </button>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-slate-950 border border-blue-500/40 text-center space-y-4 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <span className="text-xs text-slate-400 font-mono uppercase block">Live Kitchen Token</span>
              <div className="text-3xl font-black text-blue-400 font-heading tracking-widest">{orderToken}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Estimated Pickup Time: <strong>4 mins (Queue position #3)</strong></span>
            </div>

            <button
              onClick={() => setOrderPlaced(false)}
              className="text-xs text-slate-400 hover:text-white underline font-mono"
            >
              Reset Demo Order
            </button>
          </div>
        )}
      </div>
    );
  }

  // Generic fallback sandbox
  return (
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 text-center">
      <Sparkles className="w-8 h-8 text-indigo-400 mx-auto" />
      <h4 className="text-base font-bold text-white">Live Prototype Available</h4>
      <p className="text-xs text-slate-400 max-w-md mx-auto">
        This project includes open-source code and demo deployments. Click below to view official repository.
      </p>
      <a
        href={project.demo}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition"
      >
        Open Live Demo URL
      </a>
    </div>
  );
}
