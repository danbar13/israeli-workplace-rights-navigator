import React, { useState } from 'react';
import { 
  Calculator, 
  HelpCircle, 
  Check, 
  AlertTriangle, 
  Briefcase, 
  Calendar, 
  Clock, 
  Sun, 
  Coins,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const Calculators: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'severance' | 'vacation' | 'convalescence' | 'notice' | 'minwage'>('severance');

  // Severance Pay State
  const [salary, setSalary] = useState<number>(15000);
  const [years, setYears] = useState<number>(3);
  const [months, setMonths] = useState<number>(4);
  const [isSection14, setIsSection14] = useState<boolean>(true);
  const [contributionRate, setContributionRate] = useState<number>(6.0); // 6% or 8.33%
  const [fundBalance, setFundBalance] = useState<number>(32000);

  // Vacation State
  const [vacationTenure, setVacationTenure] = useState<number>(3);
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState<5 | 6>(5);

  // Convalescence State
  const [convalescenceTenure, setConvalescenceTenure] = useState<number>(4);
  const [sector, setSector] = useState<'private' | 'public'>('private');
  const [positionPercentage, setPositionPercentage] = useState<number>(100);
  const [wasPaidOldRate, setWasPaidOldRate] = useState<boolean>(false);

  // Notice Period State
  const [employeeType, setEmployeeType] = useState<'monthly' | 'hourly'>('monthly');
  const [noticeMonths, setNoticeMonths] = useState<number>(10);

  // Minimum Wage State
  const [ageGroup, setAgeGroup] = useState<'adult' | 'youth18' | 'youth17' | 'youth16' | 'apprentice'>('adult');

  // Helpers
  const formatNIS = (val: number) => {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', maximumFractionDigits: 0 }).format(val);
  };

  // Severance Calculations
  const totalSeveranceTenure = years + months / 12;
  const statutorySeverance = salary * totalSeveranceTenure;
  const taxExemptionLimit = Math.min(13750 * totalSeveranceTenure, 1.5 * salary * totalSeveranceTenure);
  const taxableSeverance = Math.max(0, statutorySeverance - taxExemptionLimit);
  
  // Section 14 Analysis
  const isFullSection14 = isSection14 && contributionRate >= 8.33;
  const completionOwed = Math.max(0, statutorySeverance - fundBalance);

  // Vacation calculations (Statutory table from Annual Leave Law & 2016 amendment)
  const getVacationDays = (tenureYears: number, daysPerWeek: 5 | 6) => {
    const table: Record<number, { gross: number; net5: number }> = {
      1: { gross: 16, net5: 12 },
      2: { gross: 16, net5: 12 },
      3: { gross: 16, net5: 12 },
      4: { gross: 16, net5: 12 },
      5: { gross: 16, net5: 12 },
      6: { gross: 18, net5: 14 },
      7: { gross: 21, net5: 15 },
      8: { gross: 22, net5: 16 },
      9: { gross: 23, net5: 17 },
      10: { gross: 24, net5: 18 },
      11: { gross: 25, net5: 19 },
      12: { gross: 26, net5: 20 },
      13: { gross: 27, net5: 20 },
    };
    const row = tenureYears >= 14 ? { gross: 28, net5: 20 } : (table[tenureYears] || { gross: 16, net5: 12 });
    return daysPerWeek === 5 ? row.net5 : row.gross;
  };
  const calculatedVacationDays = getVacationDays(vacationTenure, workDaysPerWeek);

  // Convalescence calculations (2026 rates)
  const getConvalescenceDays = (tenureYears: number) => {
    if (tenureYears < 1) return 0;
    if (tenureYears === 1) return 5;
    if (tenureYears <= 3) return 6;
    if (tenureYears <= 10) return 7;
    if (tenureYears <= 15) return 8;
    if (tenureYears <= 19) return 9;
    return 10;
  };
  const baseConvalescenceDays = getConvalescenceDays(convalescenceTenure);
  const dailyRate = sector === 'private' ? 451.5 : 511.6;
  const positionRatio = positionPercentage / 100;
  const grossConvalescenceAmount = baseConvalescenceDays * dailyRate * positionRatio;
  const reservistDeduction = baseConvalescenceDays > 0 ? 1 * dailyRate * positionRatio : 0;
  const netConvalescenceAmount = Math.max(0, grossConvalescenceAmount - reservistDeduction);
  const completionOwedForOldRate = wasPaidOldRate && sector === 'private' && baseConvalescenceDays > 0 
    ? (baseConvalescenceDays - 1) * 33.50 * positionRatio 
    : 0;

  // Notice Period Calculations
  const getNoticeDays = (type: 'monthly' | 'hourly', m: number) => {
    if (type === 'monthly') {
      if (m <= 6) return m;
      if (m < 12) return 6 + (m - 6) * 2.5;
      return 30;
    } else {
      if (m <= 12) return m;
      if (m <= 24) return 14 + Math.floor((m - 12) / 2);
      if (m <= 36) return 21 + Math.floor((m - 24) / 2);
      return 30;
    }
  };
  const noticeDaysResult = getNoticeDays(employeeType, noticeMonths);

  // Minimum Wage Calculations (April 2026 rates)
  const getMinWageInfo = (group: typeof ageGroup) => {
    switch (group) {
      case 'adult':
        return { monthly: 6443.85, hourly: 35.40, desc: 'מבוגר (מגיל 18+)', divisor: 182, pct: '100%' };
      case 'youth18':
        return { monthly: 5348.40, hourly: 30.92, desc: 'נוער עד גיל 18 (83%)', divisor: 173, pct: '83%' };
      case 'youth17':
        return { monthly: 4832.89, hourly: 27.94, desc: 'נוער עד גיל 17 (75%)', divisor: 173, pct: '75%' };
      case 'youth16':
        return { monthly: 4510.70, hourly: 26.07, desc: 'נוער עד גיל 16 (70%)', divisor: 173, pct: '70%' };
      case 'apprentice':
        return { monthly: 3866.31, hourly: 22.35, desc: 'חניך לפי חוק החניכות (60%)', divisor: 173, pct: '60%' };
    }
  };
  const minWageData = getMinWageInfo(ageGroup);

  return (
    <div className="max-w-5xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-2">
          <Calculator className="w-8 h-8 text-brand-600 dark:text-brand-400" />
          <span>מחשבונים משפטיים אינטראקטיביים</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl mx-auto">
          חישוב מדויק של זכויות עובדים על פי החוק הישראלי, תקנות העבודה ועדכוני השכר ל-2026.
        </p>
      </div>

      {/* Tabs navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-200/80 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/60">
        <button
          onClick={() => setActiveTab('severance')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
            activeTab === 'severance' 
              ? 'bg-white dark:bg-slate-700 text-brand-700 dark:text-white shadow-xs' 
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
          }`}
        >
          <Briefcase className="w-4 h-4 text-brand-500" />
          <span>פיצויי פיטורים וסעיף 14</span>
        </button>

        <button
          onClick={() => setActiveTab('vacation')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
            activeTab === 'vacation' 
              ? 'bg-white dark:bg-slate-700 text-brand-700 dark:text-white shadow-xs' 
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
          }`}
        >
          <Calendar className="w-4 h-4 text-sky-500" />
          <span>חופשה שנתית</span>
        </button>

        <button
          onClick={() => setActiveTab('convalescence')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
            activeTab === 'convalescence' 
              ? 'bg-white dark:bg-slate-700 text-brand-700 dark:text-white shadow-xs' 
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
          }`}
        >
          <Sun className="w-4 h-4 text-amber-500" />
          <span>דמי הבראה 2026</span>
        </button>

        <button
          onClick={() => setActiveTab('notice')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
            activeTab === 'notice' 
              ? 'bg-white dark:bg-slate-700 text-brand-700 dark:text-white shadow-xs' 
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
          }`}
        >
          <Clock className="w-4 h-4 text-indigo-500" />
          <span>הודעה מוקדמת</span>
        </button>

        <button
          onClick={() => setActiveTab('minwage')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
            activeTab === 'minwage' 
              ? 'bg-white dark:bg-slate-700 text-brand-700 dark:text-white shadow-xs' 
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
          }`}
        >
          <Coins className="w-4 h-4 text-emerald-500" />
          <span>שכר מינימום ונוער</span>
        </button>
      </div>

      {/* Calculator Body */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-8 transition-colors">
        
        {/* TAB 1: SEVERANCE PAY */}
        {activeTab === 'severance' && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">מחשבון פיצויי פיטורים ובדיקת סעיף 14</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                לפי חוק פיצויי פיטורים, תשכ"ג-1963, האישור הכללי לסעיף 14 וצו הרחבה פנסיה חובה.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    משכורת חודשית אחרונה ברוטו (כולל רכיבים קבועים)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      value={salary}
                      onChange={(e) => setSalary(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 text-left font-mono font-bold"
                    />
                    <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₪</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">שנות עבודה מלאות</label>
                    <input
                      type="number"
                      min="0"
                      value={years}
                      onChange={(e) => setYears(Math.max(0, Number(e.target.value)))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 text-left font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">חודשים נוספים (0-11)</label>
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={months}
                      onChange={(e) => setMonths(Math.min(11, Math.max(0, Number(e.target.value))))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 text-left font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-slate-800 dark:text-slate-200">האם חל הסכם סעיף 14 חתום?</label>
                    <input
                      type="checkbox"
                      checked={isSection14}
                      onChange={(e) => setIsSection14(e.target.checked)}
                      className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500"
                    />
                  </div>

                  {isSection14 && (
                    <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          שיעור הפקדת המעסיק לפיצויים (בדקו בתלוש השכר)
                        </label>
                        <select
                          value={contributionRate}
                          onChange={(e) => setContributionRate(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm font-bold"
                        >
                          <option value={6.0}>6.0% (רצפת צו ההרחבה לפנסיה - מכסה כ-72% מחובת החוק)</option>
                          <option value={8.33}>8.33% (חודש מלא לשנה - 1/12 פטור מלא מסעיף 14)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          יתרת צבירה ברכיב הפיצויים בקרן (Fund Balance)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            value={fundBalance}
                            onChange={(e) => setFundBalance(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-left font-mono font-bold text-sm"
                          />
                          <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">₪</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Outputs / Analysis */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 space-y-4">
                <h4 className="font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700/60 pb-2 flex items-center justify-between">
                  <span>תוצאות חישוב פיצויים</span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">ותק כולל: {totalSeveranceTenure.toFixed(2)} שנים</span>
                </h4>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-xs">
                    <span className="text-xs text-slate-600 dark:text-slate-300 font-bold">זכאות לפי חוק (משכורת אחרונה × ותק):</span>
                    <span className="text-lg font-black text-brand-600 dark:text-brand-400 font-mono">{formatNIS(statutorySeverance)}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                    <div>
                      <span className="text-xs text-slate-600 dark:text-slate-300 font-bold block">תקרת פטור ממס (13,750 ₪ לשנה ב-2026):</span>
                      <span className="text-[11px] text-slate-400">חלק פטור ממס הכנסה</span>
                    </div>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">{formatNIS(taxExemptionLimit)}</span>
                  </div>

                  {taxableSeverance > 0 && (
                    <div className="flex items-center justify-between p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-xs">
                      <span className="text-amber-800 dark:text-amber-300 font-bold">סכום החייב במס (מעל התקרה):</span>
                      <span className="font-bold text-amber-950 dark:text-amber-200 font-mono">{formatNIS(taxableSeverance)}</span>
                    </div>
                  )}

                  {/* Section 14 Analysis Card */}
                  {isSection14 ? (
                    <div className="p-4 rounded-2xl border space-y-2 text-xs leading-relaxed bg-white dark:bg-slate-800 border-brand-200 dark:border-brand-900/60">
                      <div className="font-bold text-brand-900 dark:text-brand-300 flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                        <span>ניתוח הסדר סעיף 14:</span>
                      </div>
                      {contributionRate < 8.33 ? (
                        <>
                          <p className="text-slate-700 dark:text-slate-300">
                            מכיוון שהופקדו <strong>{contributionRate}%</strong> בלבד, המעסיק <strong>אינו פטור</strong> מתשלום השלמת פיצויים!
                          </p>
                          <div className="bg-amber-50 dark:bg-amber-950/60 p-3 rounded-xl border border-amber-300 dark:border-amber-700 font-bold text-amber-950 dark:text-amber-200 flex items-center justify-between">
                            <span>השלמת פיצויים במזומן המגיעה לעובד:</span>
                            <span className="text-base font-black font-mono">{formatNIS(completionOwed)}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            העובד מקבל את יתרת הקופה ({formatNIS(fundBalance)}) + השלמת מעסיק של {formatNIS(completionOwed)}, סה"כ: {formatNIS(statutorySeverance)}.
                          </p>
                        </>
                      ) : (
                        <p className="text-emerald-800 dark:text-emerald-300 font-medium">
                          בהפקדה מלאה של 8.33% עם הסכם חתום, העובד מקבל את <strong>מלוא יתרת הקופה ({formatNIS(fundBalance)})</strong>, והמעסיק משוחרר מהשלמה.
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs text-slate-600 dark:text-slate-300">
                      ללא הסכם סעיף 14 חתום בכתב, המעסיק מחויב במלוא הפיצויים החוקיים ({formatNIS(statutorySeverance)}).
                    </div>
                  )}
                </div>

                {/* Deadlines alert */}
                <div className="p-3.5 bg-red-50 dark:bg-red-950/30 rounded-2xl border border-red-200 dark:border-red-900/60 text-xs text-red-950 dark:text-red-200 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-red-800 dark:text-red-300">
                    <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                    <span>אזהרות קריטיות בפיטורים:</span>
                  </div>
                  <p>• מועד תשלום: המעסיק חייב לשלם תוך <strong>15 יום</strong> מיום הפיטורים.</p>
                  <p>• התיישנות הלנה: תביעת הלנה מתיישנת תוך <strong>60 יום</strong> מקבלת התשלום (או שנה ממועד הזכאות).</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VACATION DAYS */}
        {activeTab === 'vacation' && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">מחשבון ימי חופשה שנתית</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                לפי חוק חופשה שנתית, תשי"א-1951 והתיקון משנת 2016 (טבלת ותק סטטוטורית מדויקת).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">שנות ותק במקום העבודה (שנים מלאות)</label>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    value={vacationTenure}
                    onChange={(e) => setVacationTenure(Math.max(1, Number(e.target.value)))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-left font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">מבנה שבוע העבודה</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setWorkDaysPerWeek(5)}
                      className={`py-2.5 px-4 rounded-xl border text-sm font-bold transition-all duration-200 ${
                        workDaysPerWeek === 5 
                          ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-500 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20' 
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      5 ימי עבודה בשבוע (נטו)
                    </button>
                    <button
                      type="button"
                      onClick={() => setWorkDaysPerWeek(6)}
                      className={`py-2.5 px-4 rounded-xl border text-sm font-bold transition-all duration-200 ${
                        workDaysPerWeek === 6 
                          ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-500 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20' 
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      6 ימי עבודה (קלנדרי)
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-800/60 text-xs text-sky-950 dark:text-sky-200 space-y-1.5">
                  <div className="font-bold flex items-center gap-1.5 text-sky-800 dark:text-sky-300">
                    <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <span>עדכון חירום ומילואים 2026:</span>
                  </div>
                  <p>
                    עובד שלא התאפשר לו לנצל חופשה עקב מצב חירום או שירות מילואים, רשאי לצבור ולהעביר את ימי החופשה לשנתיים הבאות <strong>ללא צורך בהסכמת המעסיק</strong>.
                  </p>
                </div>
              </div>

              {/* Output Display */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-5 text-center">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  זכאות חופשה שנתית לותק {vacationTenure} {vacationTenure === 1 ? 'שנה' : 'שנים'}
                </span>

                <div className="py-2">
                  <div className="text-5xl font-black text-brand-600 dark:text-brand-400 inline-block font-mono">
                    {calculatedVacationDays}
                  </div>
                  <span className="text-lg font-bold text-slate-700 dark:text-slate-300 mr-2">
                    {workDaysPerWeek === 5 ? 'ימי היעדרות בפועל (נטו)' : 'ימי ברוטו קלנדריים'}
                  </span>
                </div>

                <div className="text-right text-xs text-slate-600 dark:text-slate-300 space-y-2 border-t border-slate-200 dark:border-slate-700/60 pt-3">
                  <p>• <strong>פדיון חופשה:</strong> ניתן לפדות ימי חופשה בכסף אך ורק בסיום יחסי העבודה.</p>
                  <p>• <strong>התיישנות פדיון:</strong> מוגבל לשנה השוטפת ולשנתיים שקדמו לה (3 שנים בסך הכל).</p>
                  <p>• <strong>הודאת בעל דין:</strong> אם תלוש השכר מציג צבירה גבוהה יותר, העובד רשאי לפדות את מלוא הימים הרשומים בתלוש.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CONVALESCENCE PAY */}
        {activeTab === 'convalescence' && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">מחשבון דמי הבראה 2026</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                לפי צו ההרחבה המעודכן מיום 18.8.2026 (תעריף 451.50 ₪ בפרטי, כולל בדיקת השלמת 33.50 ₪ ליום).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">שנות ותק במקום העבודה (שנים מלאות)</label>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    value={convalescenceTenure}
                    onChange={(e) => setConvalescenceTenure(Math.max(1, Number(e.target.value)))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-left"
                  />
                  {convalescenceTenure < 1 && (
                    <span className="text-xs text-red-500 mt-1 block font-bold">דמי הבראה משולמים רק לאחר השלמת שנת עבודה מלאה.</span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">מגזר העסקה</label>
                    <select
                      value={sector}
                      onChange={(e) => setSector(e.target.value as 'private' | 'public')}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm font-bold"
                    >
                      <option value="private">מגזר פרטי (451.50 ₪ ליום)</option>
                      <option value="public">מגזר ציבורי (511.60 ₪ ליום)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">היקף משרה (%)</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={positionPercentage}
                      onChange={(e) => setPositionPercentage(Math.min(100, Math.max(1, Number(e.target.value))))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-left"
                    />
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800 dark:text-slate-200">
                    <input
                      type="checkbox"
                      checked={wasPaidOldRate}
                      onChange={(e) => setWasPaidOldRate(e.target.checked)}
                      className="w-4 h-4 text-brand-600 rounded"
                    />
                    <span>האם המעסיק שילם לפי התעריף הישן של 418 ₪ ליום?</span>
                  </label>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 pr-6">
                    מעסיק ששילם לפי 418 ₪ חייב השלמה רטרואקטיבית של 33.50 ₪ לכל יום הבראה לשנת 2026.
                  </p>
                </div>
              </div>

              {/* Convalescence Output */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
                <h4 className="font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700/60 pb-2 flex items-center justify-between">
                  <span>זכאות דמי הבראה (שנת 2026)</span>
                  <span className="text-xs text-brand-600 dark:text-brand-400 font-extrabold">{baseConvalescenceDays} ימי הבראה</span>
                </h4>

                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center justify-between p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">סכום זכאות בסיסי מלא:</span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">{formatNIS(grossConvalescenceAmount)}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-xs">
                    <span className="text-amber-800 dark:text-amber-300 font-bold">ניכוי יום 1 למימון מילואים (הוראת שעה):</span>
                    <span className="font-bold text-amber-950 dark:text-amber-200 font-mono">-{formatNIS(reservistDeduction)}</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-brand-50 dark:bg-brand-950/60 rounded-2xl border border-brand-200 dark:border-brand-800">
                    <span className="text-xs font-bold text-brand-950 dark:text-brand-200">תשלום נטו לכיס העובד (לאחר הניכוי):</span>
                    <span className="text-xl font-black text-brand-700 dark:text-brand-300 font-mono">{formatNIS(netConvalescenceAmount)}</span>
                  </div>

                  {wasPaidOldRate && completionOwedForOldRate > 0 && (
                    <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl border border-emerald-300 dark:border-emerald-800 text-xs space-y-1">
                      <div className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>זכאות להפרשי שכר:</span>
                      </div>
                      <p className="text-emerald-800 dark:text-emerald-200">
                        המעסיק חייב לך <strong>השלמה של {formatNIS(completionOwedForOldRate)}</strong> (33.50 ₪ × {baseConvalescenceDays - 1} ימים משולמים).
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: NOTICE PERIOD */}
        {activeTab === 'notice' && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">מחשבון הודעה מוקדמת לפיטורים ולהתפטרות</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                לפי חוק הודעה מוקדמת לפיטורים ולהתפטרות, תשס"א-2001 (טבלה מדויקת לחודש בחודשו).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">סוג ההעסקה</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setEmployeeType('monthly')}
                      className={`py-2.5 px-4 rounded-xl border text-sm font-bold transition-all duration-200 ${
                        employeeType === 'monthly'
                          ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-500 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      עובד במשכורת חודשית
                    </button>
                    <button
                      type="button"
                      onClick={() => setEmployeeType('hourly')}
                      className={`py-2.5 px-4 rounded-xl border text-sm font-bold transition-all duration-200 ${
                        employeeType === 'hourly'
                          ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-500 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      עובד שעתי / יומי
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">חודשי ותק במקום העבודה</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={noticeMonths}
                    onChange={(e) => setNoticeMonths(Math.max(1, Number(e.target.value)))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-left"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    (12 חודשים = 1 שנה, 24 חודשים = שנתיים, 36 חודשים = 3 שנים)
                  </span>
                </div>
              </div>

              {/* Notice Output */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 text-center space-y-4">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  תקופת הודעה מוקדמת מחייבת
                </span>

                <div className="py-2">
                  <div className="text-5xl font-black text-brand-600 dark:text-brand-400 inline-block font-mono">
                    {noticeDaysResult === 30 ? 'חודש מלא' : noticeDaysResult}
                  </div>
                  {noticeDaysResult !== 30 && (
                    <span className="text-lg font-bold text-slate-700 dark:text-slate-300 mr-2">ימים קלנדריים</span>
                  )}
                </div>

                <div className="text-right text-xs text-slate-600 dark:text-slate-300 space-y-2 border-t border-slate-200 dark:border-slate-700/60 pt-3">
                  <p>• <strong>חלף הודעה מוקדמת:</strong> מעסיק שמוותר על עבודתך בתקופה זו חייב לשלם את שכר התקופה במזומן (חלף הודעה מוקדמת אינו צובר פנסיה וחופשה).</p>
                  <p>• <strong>התפטרות עובד:</strong> עובד המתפטר ללא מתן הודעה מוקדמת כדין צפוי לקיזוז שוויה משכרו.</p>
                  <p>• <strong>חובת שימוע:</strong> פיטורים חייבים להיעשות לאחר שימוע כדין וזמן סביר למענה.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: MINIMUM WAGE */}
        {activeTab === 'minwage' && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">מחשבון שכר מינימום 2026 (למבוגרים ולבני נוער)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                נכון ל-1 באפריל 2026, לפי חוק שכר מינימום, התשמ"ז-1987 ותקנות שכר מינימום לנוער עובד וחניכים.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">קבוצת גיל ומעמד</label>
                  <select
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm font-bold focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="adult">מבוגר (מעל גיל 18) - 100% שכר מינימום</option>
                    <option value="youth18">נוער עד גיל 18 (83% משכר המינימום למבוגר)</option>
                    <option value="youth17">נוער עד גיל 17 (75% משכר המינימום למבוגר)</option>
                    <option value="youth16">נוער עד גיל 16 (70% משכר המינימום למבוגר)</option>
                    <option value="apprentice">חניך (Chanich לפי חוק החניכות, 60%)</option>
                  </select>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    <span>כלל המחלק החוקי:</span>
                  </div>
                  <p>
                    • שכר שעתי למבוגר מחושב לפי חלוקה ב-<strong>182 שעות</strong> (שבוע 42 שעות).
                  </p>
                  <p>
                    • שכר שעתי לנוער מחושב לפי חלוקה ב-<strong>173 שעות</strong> (שבוע 40 שעות מלא לנוער).
                  </p>
                  <p>
                    • בחודש יום ההולדת שבו הנער עובר שכבת גיל, השכר מפוצל יחסית לפני ואחרי יום ההולדת.
                  </p>
                </div>
              </div>

              {/* Minimum wage output display */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-5">
                <div className="border-b border-slate-200 dark:border-slate-700/60 pb-3 flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">{minWageData.desc}</span>
                  <span className="px-2.5 py-1 bg-brand-100 dark:bg-brand-950 text-brand-800 dark:text-brand-300 text-xs rounded-full font-black border border-brand-200 dark:border-brand-800">
                    שיעור: {minWageData.pct}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-bold block mb-1">שכר מינימום לשעה</span>
                    <span className="text-2xl font-black text-brand-600 dark:text-brand-400 font-mono">₪{minWageData.hourly.toFixed(2)}</span>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-bold block mb-1">שכר חודשי מלא</span>
                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">₪{minWageData.monthly.toLocaleString('he-IL')}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                  <p>• החזר נסיעות (עד 22.60 ₪ ליום) וגמול שעות נוספות חייבים להשתלם <strong>בנוסף</strong> לשכר זה.</p>
                  <p>• שכר מינימום הוא קוגנטי ולא ניתן לוויתור בחוזה אישי.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
