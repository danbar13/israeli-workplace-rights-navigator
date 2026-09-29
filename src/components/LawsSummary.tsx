import React from 'react';
import { Scale, BookOpen, ExternalLink, ShieldCheck, Building2, Clock, AlertCircle } from 'lucide-react';
import { OFFICIAL_EXTERNAL_LINKS } from '../data/laborRightsData';

export const LawsSummary: React.FC = () => {
  const coreLaws = [
    { name: 'חוק חופשה שנתית', year: 1951, main: 'ימי חופשה בתשלום לפי ותק, פדיון חופשה בסיום עבודה, והעברת ימים בחירום ומילואים (2026).' },
    { name: 'חוק דמי מחלה', year: 1976, main: '1.5 ימים לחודש עד 90 יום; תשלום מדורג (0% יום 1, 50% ימים 2-3, 100% יום 4+); מחלת ילד ותעודה קצרה.' },
    { name: 'חוק שעות עבודה ומנוחה', year: 1951, main: 'שבוע 42 שעות, 8 שעות ליום, שעות נוספות (125%/150%), והצטברות גמולי שבת עד 200%.' },
    { name: 'חוק פיצויי פיטורים', year: 1963, main: 'חודש לשנה לאחר שנת עבודה, הסדר סעיף 14 (6% מול 8.33%), מועד תשלום תוך 15 יום והלנה.' },
    { name: 'חוק עבודת נשים', year: 1954, main: '26 שבועות לידה והורות (15 בתשלום), איסור פיטורים בהריון מוותק 6 חודשים, הגנה לאחר לידה והפלה.' },
    { name: 'חוק שכר מינימום', year: 1987, main: '6,443.85 ₪ לחודש ו-35.40 ₪ לשעה למבוגר (נכון ל-1.4.2026), ותעריפי נוער מדורגים לפי גיל (מחלק 173).' },
    { name: 'חוק הודעה מוקדמת לפיטורים ולהתפטרות', year: 2001, main: 'חובת מתן הודעה מוקדמת מדורגת לעובד חודשי ושעתי, וחלף הודעה מוקדמת.' },
    { name: 'חוק הגנת השכר', year: 1958, main: 'חובת מסירת תלוש שכר מפורט עד היום ה-9 (סעיף 24), איסור ניכויים שלא כדין, ופיצויי הלנת שכר.' },
    { name: 'חוק למניעת הטרדה מינית', year: 1998, main: 'חובות מעסיק, מינוי ממונה, איסור התנכלות, ואחריות מזמיני שירות כלפי עובדי קבלן.' },
    { name: 'חוק שוויון זכויות לאנשים עם מוגבלויות', year: 1998, main: 'חובת ביצוע התאמות סבירות, איסור הפליה ונגישות מקום העבודה.' },
    { name: 'צו הרחבה לפנסיה חובה', year: 2008, main: 'הפרשות חובה: 6% עובד, 6.5% מעסיק תגמולים, 6% פיצויים מינימום, וזיכוי מס 35% בסעיף 45א.' },
    { name: 'צו הרחבה דמי הבראה', year: 2026, main: '5-10 ימים לפי ותק; תעריף מעודכן 451.50 ₪ בפרטי (השלמת 33.50 ₪ לשנה זו) ו-511.60 ₪ בציבורי.' }
  ];

  const limitations = [
    { type: 'תביעת שכר עבודה ופיצויי פיטורים', period: '7 שנים', note: 'תקופת ההתיישנות האזרחית הכללית בדיני עבודה.' },
    { type: 'תביעת פדיון חופשה שנתית', period: '3 שנים', note: 'מוגבל לשנה השוטפת ולשנתיים שקדמו לה, אלא אם התלוש מודה ביתרה גבוהה יותר.' },
    { type: 'תביעת פיצויי הלנת שכר והלנת פיצויים', period: '60 ימים', note: 'מלכודת קריטית! 60 יום מקבלת התשלום המאוחר (ביה"ד רשאי להאריך ל-90), או שנה מהמועד המקורי, לפי המוקדם.' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8" dir="rtl">
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-2">
          <Scale className="w-8 h-8 text-brand-600 dark:text-brand-400" />
          <span>ריכוז חקיקת העבודה, ערכאות שיפוט ומועדי התיישנות</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl mx-auto">
          כל דיני העבודה בישראל קובעים רצפת זכויות מינימלית (קוגנטית) שאין להתנות עליה בחוזה אלא לטובת העובד.
        </p>
      </div>

      {/* Limitations Alert Table */}
      <div className="bg-red-50 dark:bg-red-950/30 rounded-3xl p-6 border border-red-200 dark:border-red-900/60 space-y-4">
        <div className="flex items-center gap-2 text-red-900 dark:text-red-300 font-black text-lg">
          <Clock className="w-6 h-6 text-red-600 dark:text-red-400" />
          <span>השוואת תקופות התיישנות - שימו לב למלכודות זמן!</span>
        </div>
        <p className="text-xs text-red-800 dark:text-red-300">
          עובדים רבים מאבדים את הזכות לפיצויי הלנה יקרי ערך בגלל משא ומתן ממושך החורג מחלון 60 הימים הקצר.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {limitations.map((lim, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-red-200 dark:border-red-900/60 space-y-1 shadow-2xs">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">{lim.type}</span>
              <div className="text-xl font-black text-red-600 dark:text-red-400 font-mono">{lim.period}</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{lim.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Labor Courts Info */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-brand-50 dark:bg-brand-950/60 rounded-2xl text-brand-600 dark:text-brand-400">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">בתי הדין לעבודה וגופי האכיפה</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">סמכות שיפוט ייחודית לסכסוכי עבודה - אין סמכות לתביעות קטנות!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <span className="font-bold text-slate-800 dark:text-slate-200 block">5 בתי דין אזוריים לעבודה</span>
            <p className="text-slate-600 dark:text-slate-400">ירושלים, תל אביב, חיפה, באר שבע, ונצרת (ערכאה ראשונה לכל סכסוך עובד-מעביד).</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <span className="font-bold text-slate-800 dark:text-slate-200 block">בית הדין הארצי לעבודה (ירושלים)</span>
            <p className="text-slate-600 dark:text-slate-400">ערכאת ערעור ארצית על פסקי דין של בתי הדין האזוריים וסכסוכים קיבוציים.</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <span className="font-bold text-slate-800 dark:text-slate-200 block">ערבות ביטוח לאומי בפירוק</span>
            <p className="text-slate-600 dark:text-slate-400">במקרה של פשיטת רגל או פירוק חברה, ביטוח לאומי משלם שכר ופיצויים עד תקרה באמצעות המפרק.</p>
          </div>
        </div>
      </div>

      {/* Core Statutes Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <span>סקירת חוקי היסוד וצווי ההרחבה</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {coreLaws.map((law, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white text-sm">{law.name}</span>
                <span className="text-xs text-slate-400 font-mono">תשי"א-{law.year}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{law.main}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Official Links */}
      <div className="bg-brand-50/70 dark:bg-brand-950/40 rounded-3xl p-6 border border-brand-200 dark:border-brand-900/60 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-brand-950 dark:text-brand-200">קישורים רשמיים ומאגרי מידע מוסמכים</h3>
          <p className="text-xs text-brand-800 dark:text-brand-400">
            למידע מלא ומעמיק, כולל נוסחי חוקים ופסיקות בתי הדין לעבודה:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {OFFICIAL_EXTERNAL_LINKS.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-brand-200/80 dark:border-slate-800 hover:border-brand-500 hover:shadow-xs transition flex items-center justify-between group"
            >
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 dark:text-white text-xs group-hover:text-brand-700 dark:group-hover:text-brand-400 transition block">
                  {link.name}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{link.description}</span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 flex-shrink-0 mr-2" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
