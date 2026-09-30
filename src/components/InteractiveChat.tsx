import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  Scale, 
  HelpCircle,
  RefreshCw,
  Search,
  ArrowLeft,
  ListChecks
} from 'lucide-react';
import { answerLaborQuestion, AnswerResponse } from '../data/qaEngine';
import { FREQUENT_SCENARIOS, UserZone } from '../data/laborRightsData';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  answerData?: AnswerResponse;
  timestamp: string;
}

interface InteractiveChatProps {
  zone?: UserZone;
  onNavigateTab?: (tab: 'categories' | 'calculators' | 'laws' | 'search') => void;
}

export const InteractiveChat: React.FC<InteractiveChatProps> = ({ 
  zone = 'employee',
  onNavigateTab 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: zone === 'employee'
        ? 'שלום! אני יועץ הזכויות לעובדי המלונאות ואילת. שאל אותי כל שאלה בשפה חופשית ופשוטה (לדוגמה: "כמה זה תוספת אילת?", "איך מחשבים פיצול משמרות במלון?", "כמה מותר להוריד לי על חדר?", "איך משלמים על שעות נוספות בשבת?", "פוטרתי אחרי 10 חודשים"). אענה לך ישירות כאן עם כל מה שמגיע לך!'
        : 'שלום! מערכת ייעוץ משפטי, חשבותי והסכמי עבודה לענף המלונאות, נספח אילת ודיני עבודה. הזן שאילתה משפטית, סעיף חוק או תרחיש שכר (למשל: "הוראות סעיף 20 ופיצול משמרות בענף המלונאות", "פעימות שכר ותוספת אילת 2025-2026", "תקרות ניכוי דיור וסעיף 25 לחוק הגנת השכר", "שעות נוספות בשבת - הלכת כהן"). המערכת תספק ניתוח מדויק עם אסמכתאות.',
      timestamp: 'עכשיו'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isProcessing) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsProcessing(true);

    setTimeout(() => {
      const responseData = answerLaborQuestion(query.trim(), zone);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: responseData.summary,
        answerData: responseData,
        timestamp: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsProcessing(false);
    }, 300);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: 'השיחה אופסה. שאל אותי כל שאלה לגבי זכויות עובדי המלונאות או לחץ על אחד מהתרחישים המוכנים מראש.',
        timestamp: 'עכשיו'
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4" dir="rtl">
      {/* Header card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-brand-50 dark:bg-brand-950/60 rounded-2xl text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-brand-900/60">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>יועץ תרחישים ושאלות בזכויות עבודה</span>
              <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[11px] rounded-full font-bold border border-emerald-200 dark:border-emerald-800/40">
                מענה ישיר ומלא
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              יועץ מומחה לזכויות עבודה והסכמים קיבוציים במלונאות ואילת. כל התשובות ניתנות ישירות מתוך מאגר הנתונים והחוקים של הפורטל.
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>נקה שיחה</span>
        </button>
      </div>

      {/* Preset scenario prompt chips */}
      <div className="space-y-1.5">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block px-1">תרחישים נפוצים לבדיקה מהירה בלחיצה אחת:</span>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {FREQUENT_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleSendMessage(sc.question)}
              className="flex-shrink-0 text-xs px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-400 dark:hover:border-brand-500 hover:text-brand-700 dark:hover:text-brand-300 text-slate-700 dark:text-slate-200 rounded-xl transition shadow-2xs flex items-center gap-1.5 group font-medium cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-500 group-hover:scale-110 transition" />
              <span>{sc.question}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat messages viewport */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-4 sm:p-6 min-h-[420px] max-h-[650px] overflow-y-auto space-y-4 transition-colors">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold ${
              msg.sender === 'user' ? 'bg-slate-800 dark:bg-slate-700' : 'bg-brand-600 dark:bg-brand-500'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Scale className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div className={`max-w-[88%] sm:max-w-[82%] rounded-3xl p-4 sm:p-5 text-sm leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-brand-600 dark:bg-brand-600 text-white rounded-tl-none font-medium'
                : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 rounded-tr-none border border-slate-200 dark:border-slate-700/80 shadow-2xs'
            }`}>
              {msg.sender === 'user' ? (
                <p className="whitespace-pre-wrap">{msg.text}</p>
              ) : (
                <div className="space-y-4">
                  {/* Direct Answer / Summary */}
                  <div className="text-slate-900 dark:text-white text-sm sm:text-base font-semibold leading-relaxed">
                    {msg.text}
                  </div>

                  {msg.answerData && (
                    <div className="space-y-3.5 pt-3 border-t border-slate-200/80 dark:border-slate-700/80">
                      
                      {/* Key Points / Rules */}
                      {msg.answerData.rulesAndCalculation && msg.answerData.rulesAndCalculation.length > 0 && (
                        <div className="space-y-2 bg-white/80 dark:bg-slate-900/60 p-3.5 rounded-2xl border border-slate-200/70 dark:border-slate-800">
                          <h4 className="font-bold text-xs text-brand-800 dark:text-brand-300 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                            <span>עיקרי הדברים, חישובים והוראות הדין:</span>
                          </h4>
                          <ul className="space-y-1.5 pr-1">
                            {msg.answerData.rulesAndCalculation.map((rule, idx) => (
                              <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2">
                                <span className="text-brand-500 font-bold select-none">•</span>
                                <span>{rule}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Warnings / Pitfalls (if any) */}
                      {msg.answerData.pitfallsAndWarnings && msg.answerData.pitfallsAndWarnings.length > 0 && (
                        <div className="p-3.5 bg-amber-500/10 dark:bg-amber-500/15 rounded-2xl border border-amber-300/40 dark:border-amber-500/30 text-xs text-amber-950 dark:text-amber-200 space-y-1.5">
                          <div className="font-bold flex items-center gap-1.5 text-amber-900 dark:text-amber-300">
                            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                            <span>שים לב למלכודות ודגשים חשובים:</span>
                          </div>
                          <ul className="space-y-1 pr-1">
                            {msg.answerData.pitfallsAndWarnings.map((pit, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                                <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                                <span>{pit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Recommended Practical Steps (if any) */}
                      {msg.answerData.recommendedSteps && msg.answerData.recommendedSteps.length > 0 && (
                        <div className="p-3 bg-sky-500/10 dark:bg-sky-500/15 rounded-2xl border border-sky-300/40 dark:border-sky-500/30 text-xs text-sky-950 dark:text-sky-200 space-y-1">
                          <div className="font-bold flex items-center gap-1.5 text-sky-900 dark:text-sky-300">
                            <ListChecks className="w-4 h-4 text-sky-600 dark:text-sky-400 flex-shrink-0" />
                            <span>מה כדאי לעשות בפועל:</span>
                          </div>
                          <ul className="space-y-1 pr-1">
                            {msg.answerData.recommendedSteps.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                                <span className="text-sky-600 dark:text-sky-400 font-bold">✓</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Internal Portal Action Button */}
                      {msg.answerData.suggestedAction && onNavigateTab && (
                        <div className="pt-1">
                          <button
                            onClick={() => onNavigateTab(msg.answerData!.suggestedAction!.tab)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs transition shadow-xs cursor-pointer group"
                          >
                            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:translate-x-[-2px]" />
                            <span>{msg.answerData.suggestedAction.label}</span>
                          </button>
                        </div>
                      )}

                      {/* Follow-up Questions Suggestions */}
                      {msg.answerData.followUpQuestions && msg.answerData.followUpQuestions.length > 0 && (
                        <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
                          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">
                            שאלות המשך מומלצות:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.answerData.followUpQuestions.map((q, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleSendMessage(q)}
                                className="text-xs px-2.5 py-1.5 bg-white dark:bg-slate-900 hover:bg-brand-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-300 rounded-xl transition border border-slate-200 dark:border-slate-700/80 cursor-pointer flex items-center gap-1.5 shadow-2xs font-medium"
                              >
                                <Sparkles className="w-3 h-3 text-brand-500" />
                                <span>{q}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Clean footer line with legal reference */}
                      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 gap-2 border-t border-slate-100 dark:border-slate-800">
                        {msg.answerData.legalBasis && (
                          <span className="flex items-center gap-1 font-medium">
                            <Scale className="w-3.5 h-3.5 text-slate-400" />
                            <span>{msg.answerData.legalBasis}</span>
                          </span>
                        )}
                        <span>{msg.answerData.sourceNote}</span>

                        {msg.answerData.externalRefUrl && (
                          <a
                            href={msg.answerData.externalRefUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>{msg.answerData.externalRefTitle || 'מקור משפטי להרחבה'}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {isProcessing && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-600 dark:bg-brand-500 flex items-center justify-center text-white text-xs">
              <Scale className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 rounded-3xl rounded-tr-none p-3.5 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
              <span>בודק את הוראות ההסכם הקיבוצי ודיני העבודה במאגר הפורטל...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-700 p-2 shadow-sm focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-brand-500 transition-colors"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="תאר את המקרה שלך או שאל שאלה (לדוגמה: כמה תוספת אילת מגיעה לי, פוטרתי אחרי שנה, כמה מותר לנכות על דירה)..."
          className="flex-1 px-3 py-2 text-sm bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isProcessing}
          className="p-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white rounded-xl transition flex items-center justify-center flex-shrink-0 cursor-pointer"
          aria-label="שלח שאלה"
        >
          <Send className="w-4 h-4 transform rotate-180" />
        </button>
      </form>
    </div>
  );
};
