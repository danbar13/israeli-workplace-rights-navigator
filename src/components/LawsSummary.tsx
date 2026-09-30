import React from 'react';
import { 
  Scale, 
  BookOpen, 
  ExternalLink, 
  Building2, 
  Clock, 
  FileText
} from 'lucide-react';
import { OFFICIAL_EXTERNAL_LINKS } from '../data/laborRightsData';

interface CoreLawItem {
  name: string;
  hebrewYear: string;
  main: string;
  lawUrl: string; // Link to authoritative consolidated statute (Nevo) or official government agreements database
  lawUrlLabel?: string; // Optional custom label, defaults to "נוסח מלא (נבו)"
  kolZchutUrl: string; // Link to Kol Zchut portal
}

export const LawsSummary: React.FC = () => {
  const coreLaws: CoreLawItem[] = [
    {
      name: 'הסכם קיבוצי כללי בענף המלונאות (2023-2026)',
      hebrewYear: 'מס\' 20230232 מיום 05.06.2023',
      main: 'הסכם ענפי מחייב: 8.33% פיצויי פיטורים מלאים, 6.5% תגמולי מעסיק, 7.5% קרן השתלמות ענפית, פיצול משמרות (7=8 שעות), וקיצור משרה ל-176 שעות חודשיות.',
      lawUrl: 'https://malam-payroll.com/wp-content/uploads/2025/07/heskemmelonaut050623.pdf',
      lawUrlLabel: 'נוסח ההסכם המלא (PDF)',
      kolZchutUrl: 'https://www.kolzchut.org.il/he/זכותון_עובדים_בענף_המלונאות'
    },
    {
      name: 'נספח אילת להסכם הקיבוצי בענף המלונאות',
      hebrewYear: 'עדכון אוגוסט 2025 / 2026',
      main: 'תוספת אילת (383.09 ₪ לחודש), ביטול תנאי תעודת זהות בפסיקה (דב"ע נד/3-111), מענקי התמדה ועונתיות, ומגורי עובדים.',
      lawUrl: 'https://malam-payroll.com/wp-content/uploads/2025/09/heskem050623.pdf',
      lawUrlLabel: 'נוסח עדכון אילת (PDF)',
      kolZchutUrl: 'https://www.kolzchut.org.il/he/זכותון_עובדים_בענף_המלונאות'
    },
    {
      name: 'סעיף 11 לפקודת מס הכנסה (הטבת מס אילת)',
      hebrewYear: 'חוק אזור סחר חופשי באילת, התשמ"ה-1985',
      main: 'זיכוי של 10% ממס הכנסה על יגיעה אישית לתושבי אילת מעל 12 חודשים, תקרה עד כ-268,200 ₪ הכנסה (עד 2,235 ₪ לחודש).',
      lawUrl: 'https://www.nevo.co.il/law_html/law01/009_001.htm',
      lawUrlLabel: 'חוק אזור סחר חופשי (נבו)',
      kolZchutUrl: 'https://www.kolzchut.org.il/he/זיכוי_ממס_הכנסה_לתושבים_בפריפריה'
    },
    { 
      name: 'חוק חופשה שנתית', 
      hebrewYear: 'תשי"א-1951', 
      main: 'ימי חופשה בתשלום לפי ותק, פדיון חופשה בסיום עבודה, והעברת ימים בחירום ומילואים (2026).',
      lawUrl: 'https://www.nevo.co.il/law_html/law00/71906.htm',
      kolZchutUrl: 'https://www.kolzchut.org.il/he/חופשה_שנתית'
    },
    { 
      name: 'חוק דמי מחלה', 
      hebrewYear: 'תשל"ו-1976', 
      main: '1.5 ימים לחודש עד 90 יום; תשלום מדורג (0% יום 1, 50% ימים 2-3, 100% יום 4+); מחלת ילד ותעודה קצרה.',
      lawUrl: 'https://www.nevo.co.il/law_html/law00/71572.htm',
      kolZchutUrl: 'https://www.kolzchut.org.il/he/דמי_מחלה'
    },
    { 
      name: 'חוק שעות עבודה ומנוחה', 
      hebrewYear: 'תשי"א-1951', 
      main: 'שבוע 42 שעות, 8 שעות ליום, שעות נוספות (125%/150%), והצטברות גמולי שבת עד 200%.',
      lawUrl: 'https://www.nevo.co.il/law_html/law00/5174.htm',
      kolZchutUrl: 'https://www.kolzchut.org.il/he/גמול_עבור_העסקה_במנוחה_השבועית'
    },
    { 
      name: 'חוק פיצויי פיטורים', 
      hebrewYear: 'תשכ"ג-1963', 
      main: 'חודש לשנה לאחר שנת עבודה, הסדר סעיף 14 (6% מול 8.33%), מועד תשלום תוך 15 יום והלנה.',
      lawUrl: 'https://www.nevo.co.il/law_html/law00/4566.htm',
      kolZchutUrl: 'https://www.kolzchut.org.il/he/פיצויי_פיטורים'
    },
    { 
      name: 'חוק עבודת נשים', 
      hebrewYear: 'תשי"ד-1954', 
      main: '26 שבועות לידה והורות (15 בתשלום), איסור פיטורים בהריון מוותק 6 חודשים, הגנה לאחר לידה והפלה.',
      lawUrl: 'https://www.nevo.co.il/law_html/law00/74249.htm',
      kolZchutUrl: 'https://www.kolzchut.org.il/he/איסור_פיטורי_עובדת_בהיריון'
    },
    { 
      name: 'חוק עבודת הנוער', 
      hebrewYear: 'תשי"ג-1953', 
      main: 'שבוע 40 שעות, איסור מוחלט על שעות נוספות ושבת, איסור עבודת לילה, שכר לפי גיל (מחלק 173), והתלמדות בתשלום מלא.',
      lawUrl: 'https://www.nevo.co.il/law_html/law00/4273.htm',
      kolZchutUrl: 'https://www.kolzchut.org.il/he/זכותון_נוער_עובד'
    },
    { 
      name: 'חוק שכר מינימום', 
      hebrewYear: 'תשמ"ז-1987', 
      main: '6,443.85 ₪ לחודש ו-35.40 ₪ לשעה למבוגר (נכון ל-1.4.2026), ותעריפי נוער מדורגים לפי גיל (מחלק 173).',
      lawUrl: 'https://www.nevo.co.il/law_html/law00/98675.htm',
      kolZchutUrl: 'https://www.kolzchut.org.il/he/שכר_מינימום'
    },
    { 
      name: 'חוק הודעה מוקדמת לפיטורים ולהתפטרות', 
      hebrewYear: 'תשס"א-2001', 
      main: 'חובת מתן הודעה מוקדמת מדורגת לעובד חודשי ושעתי, וחלף הודעה מוקדמת.',
      lawUrl: 'https://www.nevo.co.il/law_html/law00/71704.htm',
      kolZchutUrl: 'https://www.kolzchut.org.il/he/הודעה_מוקדמת_לפיטורים'
    },
    { 
      name: 'חוק הגנת השכר', 
      hebrewYear: 'תשי"ח-1958', 
      main: 'חובת מסירת תלוש שכר מפורט עד היום ה-9 (סעיף 24), איסור ניכויים שלא כדין, ופיצויי הלנת שכר.',
      lawUrl: 'https://www.nevo.co.il/law_html/law00/71689.htm',
      kolZchutUrl: 'https://www.kolzchut.org.il/he/מועד_תשלום_השכר'
    },
    { 
      name: 'חוק למניעת הטרדה מינית', 
      hebrewYear: 'תשנ"ח-1998', 
      main: 'חובות מעסיק, מינוי ממונה, איסור התנכלות, ואחריות מזמיני שירות כלפי עובדי קבלן.',
      lawUrl: 'https://www.nevo.co.il/law_html/law00/72507.htm',
      kolZchutUrl: 'https://www.kolzchut.org.il/he/הטרדה_מינית'
    },
    { 
      name: 'חוק שוויון זכויות לאנשים עם מוגבלות', 
      hebrewYear: 'תשנ"ח-1998', 
      main: 'חובת ביצוע התאמות סבירות, איסור הפליה ונגישות מקום העבודה.',
      lawUrl: 'https://www.nevo.co.il/law_html/law01/p214m2_001.htm',
      kolZchutUrl: 'https://www.kolzchut.org.il/he/תעסוקת_אנשים_עם_מוגבלויות'
    },
    { 
      name: 'חוק בית הדין לעבודה', 
      hebrewYear: 'תשכ"ט-1969', 
      main: 'סמכות שיפוט ייחודית לסכסוכי עבודה, שלילת סמכות מתביעות קטנות, וערעורים בארצי.',
      lawUrl: 'https://www.nevo.co.il/law_html/law00/74611.htm',
      kolZchutUrl: 'https://www.kolzchut.org.il/he/בתי_הדין_האזוריים_לעבודה'
    },
    { 
      name: 'צו הרחבה לפנסיה חובה', 
      hebrewYear: 'תשס"ח-2008', 
      main: 'הפרשות חובה: 6% עובד, 6.5% מעסיק תגמולים, 6% פיצויים מינימום, וזיכוי מס 35% בסעיף 45א.',
      lawUrl: 'https://www.nevo.co.il/law_html/law01/p214_001.htm',
      lawUrlLabel: 'נוסח הצו (נבו)',
      kolZchutUrl: 'https://www.kolzchut.org.il/he/צו_הרחבה_לביטוח_פנסיוני_מקיף_במשק'
    },
    { 
      name: 'צו הרחבה דמי הבראה', 
      hebrewYear: 'מעודכן 2026', 
      main: '5-10 ימים לפי ותק; תעריף מעודכן 451.50 ₪ בפרטי (השלמת 33.50 ₪ לשנה זו) ו-511.60 ₪ בציבורי.',
      lawUrl: 'https://www.nevo.co.il/law_html/law00/71871.htm',
      lawUrlLabel: 'נוסח הצו (נבו)',
      kolZchutUrl: 'https://www.kolzchut.org.il/he/דמי_הבראה'
    }
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
          כל דיני העבודה בישראל קובעים רצפת זכויות מינימלית (קוגנטית) שאין להתנות עליה בחוזה אלא לטובת העובד. לחצו על כל חוק לצפייה בנוסח החוק המלא והמעודכן.
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

      {/* Core Statutes Interactive Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>סקירת חוקי היסוד וצווי ההרחבה (נוסח חוק מלא)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              לחצו על הכפתורים בכל כרטיס למעבר ישיר לנוסח החוק המלא באתר נבו (מאגר החקיקה הישראלי) או להסבר מפורט באתר כל זכות.
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 rounded-full border border-brand-200 dark:border-brand-800 self-start sm:self-auto font-bold">
            {coreLaws.length} חוקים וצווים
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {coreLaws.map((law, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-brand-400 dark:hover:border-brand-500/80 transition-all duration-200 shadow-2xs hover:shadow-md flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-brand-50 dark:bg-brand-950/60 rounded-xl text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {law.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-200/80 dark:border-slate-700 whitespace-nowrap">
                    {law.hebrewYear}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pr-1">
                  {law.main}
                </p>
              </div>

              {/* Action Buttons: Full Law on Nevo + Guide on Kol Zchut */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={law.lawUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-2xs group/btn cursor-pointer"
                  title={`פתח ${law.lawUrlLabel || 'נוסח חוק מלא (נבו)'} עבור ${law.name}`}
                  aria-label={`${law.lawUrlLabel || 'נוסח מלא'} של ${law.name}`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{law.lawUrlLabel || 'נוסח מלא (נבו)'}</span>
                  <ExternalLink className="w-3 h-3 opacity-80 group-hover/btn:translate-x-[-2px] transition-transform" />
                </a>

                <a
                  href={law.kolZchutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition border border-slate-200 dark:border-slate-700 cursor-pointer"
                  title={`מדריך והסברים על ${law.name} באתר כל זכות`}
                  aria-label={`מדריך ${law.name} באתר כל זכות`}
                >
                  <span>כל זכות</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
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
