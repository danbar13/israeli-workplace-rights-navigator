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
  Search
} from 'lucide-react';
import { answerLaborQuestion, AnswerResponse } from '../data/qaEngine';
import { FREQUENT_SCENARIOS } from '../data/laborRightsData';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  answerData?: AnswerResponse;
  timestamp: string;
}

export const InteractiveChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'שלום! אני העוזר המשפטי לדיני עבודה בישראל. שאל אותי שאלה על זכויותיך או תאר תרחיש (לדוגמה: "פוטרתי אחרי 10 חודשים", "איך מחשבים פיצויים עם סעיף 14?", "פיטרו אותי בלי שימוע", "כמה ימי מחלה מגיעים לילד?"). אענה לך אך ורק על פי הדין הישראלי המאומת וכללי העזר המוגדרים.',
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
      const responseData = answerLaborQuestion(query.trim());
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: responseData.summary,
        answerData: responseData,
        timestamp: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsProcessing(false);
    }, 350);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: 'השיחה אופסה. שאל אותי כל שאלה לגבי זכויות עובדים או לחץ על אחד מהתרחישים המוכנים מראש.',
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
                מידע מאומת
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              מענה מבוסס כללים ללא הזיות (Zero-Hallucination). אם נושא אינו במאגר, תופנו לאתר "כל זכות".
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>נקה שיחה</span>
        </button>
      </div>

      {/* Preset scenario prompt chips */}
      <div className="space-y-1.5">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block px-1">תרחישים נפוצים לבדיקה מהירה:</span>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {FREQUENT_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleSendMessage(sc.question)}
              className="flex-shrink-0 text-xs px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-400 dark:hover:border-brand-500 hover:text-brand-700 dark:hover:text-brand-300 text-slate-700 dark:text-slate-200 rounded-xl transition shadow-2xs flex items-center gap-1.5 group font-medium"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-500 group-hover:scale-110 transition" />
              <span>{sc.question}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat messages viewport */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-4 sm:p-6 min-h-[420px] max-h-[620px] overflow-y-auto space-y-4 transition-colors">
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
            <div className={`max-w-[85%] sm:max-w-[78%] rounded-3xl p-4 text-sm leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-brand-600 dark:bg-brand-600 text-white rounded-tl-none font-medium'
                : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 rounded-tr-none border border-slate-200 dark:border-slate-700/80 shadow-2xs'
            }`}>
              {msg.sender === 'user' ? (
                <p className="whitespace-pre-wrap">{msg.text}</p>
              ) : (
                <div className="space-y-4">
                  {/* Summary / Lead */}
                  <div className="font-bold text-slate-900 dark:text-white text-base leading-relaxed">
                    {msg.text}
                  </div>

                  {msg.answerData && (
                    <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-700">
                      {/* Legal Basis */}
                      {msg.answerData.legalBasis && (
                        <div className="p-3 bg-brand-50/80 dark:bg-brand-950/40 rounded-xl border border-brand-100 dark:border-brand-900/60 flex items-start gap-2.5">
                          <Scale className="w-4 h-4 text-brand-700 dark:text-brand-400 flex-shrink-0 mt-0.5" />
                          <div className="text-xs text-brand-950 dark:text-brand-200">
                            <strong>מקור החוק: </strong>
                            <span>{msg.answerData.legalBasis}</span>
                          </div>
                        </div>
                      )}

                      {/* Fallback Notice if query not in database */}
                      {msg.answerData.isFallback && (
                        <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200 text-xs flex items-start gap-2.5">
                          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong>הודעת מערכת: </strong>
                            <span>
                              כדי לשמור על דיוק משפטי, מידע שאינו מוגדר מראש במאגר מופנה ישירות לאתר "כל זכות" על מנת שלא להציג מידע שגוי.
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Rules and Calculations */}
                      {msg.answerData.rulesAndCalculation.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span>הוראות החוק וכללי החישוב:</span>
                          </h4>
                          <ul className="space-y-1.5 pr-2">
                            {msg.answerData.rulesAndCalculation.map((rule, idx) => (
                              <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2">
                                <span className="text-brand-500 font-bold">•</span>
                                <span>{rule}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Pitfalls and Warnings */}
                      {msg.answerData.pitfallsAndWarnings.length > 0 && (
                        <div className="p-3.5 bg-red-50/90 dark:bg-red-950/40 rounded-2xl border border-red-200 dark:border-red-900/60 space-y-2 text-xs text-red-950 dark:text-red-200">
                          <div className="font-bold flex items-center gap-1.5 text-red-800 dark:text-red-300">
                            <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                            <span>מלכודות ואזהרות מיוחדות:</span>
                          </div>
                          <ul className="space-y-1 pr-2">
                            {msg.answerData.pitfallsAndWarnings.map((pit, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-red-500 font-bold">•</span>
                                <span>{pit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Recommended Steps */}
                      {msg.answerData.recommendedSteps.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                            <span>צעדים מומלצים לפעולה:</span>
                          </h4>
                          <ol className="list-decimal list-inside space-y-1 text-xs text-slate-700 dark:text-slate-300 pr-1">
                            {msg.answerData.recommendedSteps.map((step, idx) => (
                              <li key={idx} className="leading-relaxed">{step}</li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {/* Kol Zchut official link */}
                      {msg.answerData.kolZchutUrl && (
                        <div className="pt-2">
                          <a
                            href={msg.answerData.kolZchutUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 dark:bg-brand-950/80 hover:bg-brand-100 dark:hover:bg-brand-900/80 text-brand-700 dark:text-brand-300 font-bold rounded-xl border border-brand-200 dark:border-brand-800 text-xs transition shadow-2xs"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>קראו עוד והרחיבו באתר "כל זכות" (Kol Zchut)</span>
                          </a>
                        </div>
                      )}

                      <div className="text-[11px] text-slate-400 dark:text-slate-500 pt-1">
                        {msg.answerData.sourceNote}
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
              <span>בודק את הוראות הדין והכללים המשפטיים...</span>
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
          placeholder="תאר את המקרה שלך או שאל שאלה (לדוגמה: פוטרתי אחרי 10 חודשים, מה מגיע לי?)..."
          className="flex-1 px-3 py-2 text-sm bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isProcessing}
          className="p-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white rounded-xl transition flex items-center justify-center flex-shrink-0"
          aria-label="שלח שאלה"
        >
          <Send className="w-4 h-4 transform rotate-180" />
        </button>
      </form>
    </div>
  );
};
