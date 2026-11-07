import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BotMessageSquare,
  Sparkles,
  Send,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Compass,
  Building,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useApp } from '../context/AppContext';

export default function Assistant() {
  const { user, allScholarships, documents, applications, readiness } = useApp();

  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Hello ${user?.name?.split(' ')[0] || 'Dhruv'}! I am **Grantly Assistant**, your personal opportunity advisor. I evaluate your profile (${user?.education?.degree}, ${user?.academics?.cgpa} CGPA, ${user?.city}, ${user?.state}) against our cataloged scholarships. How can I assist your application journey today?`,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = [
    "Which scholarships match my profile best?",
    "Why am I not eligible for certain scholarships?",
    "What documents do I need to prepare next?",
    "Which deadline should I prioritize urgently?",
    "Compare my top two opportunities."
  ];

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Contextual deterministic answering engine
    setTimeout(() => {
      const q = query.toLowerCase();
      let reply = "";
      let recommendations = [];

      if (q.includes("match") || q.includes("which scholarship") || q.includes("recommend")) {
        const topMatches = allScholarships
          .filter((s) => s.eligibility?.score >= 75)
          .slice(0, 3);
        recommendations = topMatches;
        reply = `Based on your **${user?.education?.degree}**, **${user?.academics?.cgpa} CGPA**, and **${user?.financial?.socialCategory}** status in **${user?.state}**, here are your top 3 matching programs:\n\n` +
          topMatches.map((s) => `• **${s.title}** (${s.amount}) — **${s.eligibility.score}% Match**. Deadline: ${s.deadlineInfo.label}.`).join('\n\n') +
          `\n\nAll three satisfy your academic cutoffs and income criteria.`;
      } else if (q.includes("not eligible") || q.includes("why") || q.includes("gap")) {
        const lowMatches = allScholarships.filter((s) => s.eligibility?.score < 50).slice(0, 2);
        reply = `In our catalog, low eligibility typically occurs due to mandatory eligibility constraints:\n\n` +
          lowMatches.map((s) => {
            const gap = s.eligibility?.gaps?.[0] || { criterion: "Criteria", advice: "Check education level or domicile." };
            return `• **${s.title}**: ${gap.advice}`;
          }).join('\n\n') +
          `\n\nOur system provides transparent compatibility scores so you never waste time applying to restricted state or doctoral quotas.`;
      } else if (q.includes("document") || q.includes("checklist")) {
        const pending = documents.filter((d) => d.status !== 'Ready');
        reply = `Your global Document Readiness score is currently **${readiness.score}%**.\n\n` +
          `You currently have **${pending.length} pending document(s)**:\n` +
          pending.map((d) => `• **${d.name}** (${d.type}) — ${d.notes || 'Pending upload'}`).join('\n') +
          `\n\nI recommend prioritizing your faculty recommendation letter and income certificate first.`;
      } else if (q.includes("deadline") || q.includes("prioritize") || q.includes("urgent")) {
        const urgent = allScholarships
          .filter((s) => !s.deadlineInfo.isClosed && s.deadlineInfo.daysRemaining <= 7)
          .sort((a, b) => a.deadlineInfo.daysRemaining - b.deadlineInfo.daysRemaining);
        recommendations = urgent.slice(0, 2);
        reply = `You should urgently prioritize submissions closing within 7 days:\n\n` +
          urgent.map((s) => `• **${s.title}** closes on **${s.deadlineInfo.formattedDate}** (${s.deadlineInfo.label})`).join('\n') +
          `\n\nMake sure your bonafide certificates and transcripts are ready for immediate upload.`;
      } else if (q.includes("compare")) {
        const top2 = allScholarships.slice(0, 2);
        reply = `Here is a quick comparison between your top opportunities:\n\n` +
          `1. **${top2[0].title}**: ${top2[0].amount}, Private STEM grant, Minimum CGPA: ${top2[0].academicCriteria?.minCGPA || 8.0}, closes in ${top2[0].deadlineInfo.label}.\n\n` +
          `2. **${top2[1].title}**: ${top2[1].amount}, Government Need-cum-Merit scheme, Household income limit: ₹4.5 LPA, closes in ${top2[1].deadlineInfo.label}.\n\n` +
          `You can also open the full 3-way Comparison Studio from the navigation sidebar!`;
      } else {
        reply = `I can help you navigate scholarship discovery, explain eligibility criteria, verify document checklists, or prioritize deadlines. Try asking: "Which scholarships match my profile?" or "What documents do I need?"`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text: reply,
          recommendations,
          timestamp: 'Just now'
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col">
        {/* HEADER */}
        <div className="flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
                <BotMessageSquare className="w-4 h-4" />
              </div>
              <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Grantly Assistant
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                AI Opportunity Advisor
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Contextual guidance engine powered by verified student profile & scholarship datasets
            </p>
          </div>
        </div>

        {/* CHAT MESSAGES CONTAINER */}
        <div className="flex-1 bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs overflow-y-auto space-y-4 transition-colors">
          {messages.map((msg) => {
            const isAsst = msg.sender === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isAsst ? 'justify-start' : 'justify-end'}`}
              >
                {isAsst && (
                  <div className="w-8 h-8 rounded-xl bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 flex items-center justify-center shrink-0 mt-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                    isAsst
                      ? 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700'
                      : 'bg-brand-600 dark:bg-brand-600 text-white shadow-xs'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* Inline recommended scholarship cards */}
                  {msg.recommendations && msg.recommendations.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
                      <p className="font-bold text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Referenced Opportunities:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {msg.recommendations.map((sch) => (
                          <Link
                            key={sch.id}
                            to={`/scholarship/${sch.id}`}
                            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-600 transition-colors block text-left"
                          >
                            <p className="font-bold text-slate-900 dark:text-white truncate">{sch.title}</p>
                            <p className="text-[10px] text-brand-700 dark:text-brand-400 font-extrabold">{sch.amount}</p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Match: {sch.eligibility?.score}%</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  <span
                    className={`block text-[10px] mt-2 ${
                      isAsst ? 'text-slate-400 dark:text-slate-500' : 'text-brand-200'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 text-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* QUICK PROMPTS CHIPS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0">
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 shrink-0 uppercase tracking-wider">
            Suggested:
          </span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-brand-950/50 hover:text-brand-700 dark:hover:text-brand-300 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium whitespace-nowrap transition-colors shadow-2xs cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* INPUT BOX */}
        <div className="shrink-0 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 flex items-center gap-2 shadow-xs transition-colors">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask Grantly Assistant about eligibility rules, cutoffs, or deadlines..."
            className="flex-1 px-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none bg-transparent"
          />
          <button
            onClick={() => handleSendMessage()}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}