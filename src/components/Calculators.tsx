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
  Sparkles,
  Palmtree,
  Split,
  Moon,
  Home,
  PiggyBank,
  Coffee,
  CheckCircle2,
  Percent
} from 'lucide-react';
import { UserZone } from '../data/laborRightsData';

interface CalculatorsProps {
  zone?: UserZone;
}

export const Calculators: React.FC<CalculatorsProps> = ({ zone = 'employee' }) => {
  const [activeTab, setActiveTab] = useState<
    'split' | 'weekend' | 'eilat_tax' | 'housing' | 'hotel_pension' | 'severance' | 'vacation' | 'convalescence' | 'minwage'
  >('split');

  // 1. Split Shift State
  const [splitMorningHours, setSplitMorningHours] = useState<number>(4);
  const [splitEveningHours, setSplitEveningHours] = useState<number>(3.5);
  const [splitBreakHours, setSplitBreakHours] = useState<number>(2.5);
  const [splitHourlyRate, setSplitHourlyRate] = useState<number>(40);
  const [splitRestBetweenDays, setSplitRestBetweenDays] = useState<number>(9);

  // 2. Weekend & Holiday Hotel State
  const [weekendBaseRate, setWeekendBaseRate] = useState<number>(40);
  const [weekendHours, setWeekendHours] = useState<number>(9);
  const [isHoliday, setIsHoliday] = useState<boolean>(false);
  const [isNightShift, setIsNightShift] = useState<boolean>(false);

  // 3. Eilat Tax & Allowance State
  const [eilatGrossSalary, setEilatGrossSalary] = useState<number>(12000);
  const [eilatResidencyMonths, setEilatResidencyMonths] = useState<number>(14);
  const [eilatHotelTenureMonths, setEilatHotelTenureMonths] = useState<number>(38);
  const [isFullPosition, setIsFullPosition] = useState<number>(100);

  // 4. Housing & Meals Deduction State
  const [housingDeduction, setHousingDeduction] = useState<number>(400);
  const [utilitiesDeduction, setUtilitiesDeduction] = useState<number>(130);
  const [mealsDeduction, setMealsDeduction] = useState<number>(150);
  const [roomMatesCount, setRoomMatesCount] = useState<2 | 3 | 4>(2);

  // 5. Hotel Pension & Severance State
  const [hotelPensionSalary, setHotelPensionSalary] = useState<number>(9500);
  const [hotelTenureMonthsForPension, setHotelTenureMonthsForPension] = useState<number>(40);

  // 6. General Statutory State (Severance, Vacation, Convalescence, MinWage)
  const [statSalary, setStatSalary] = useState<number>(15000);
  const [statYears, setStatYears] = useState<number>(3);
  const [statMonths, setStatMonths] = useState<number>(4);
  const [statSection14Rate, setStatSection14Rate] = useState<number>(6.0); // 6% or 8.33%
  const [statFundBalance, setStatFundBalance] = useState<number>(32000);

  const [vacationTenure, setVacationTenure] = useState<number>(3);
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState<5 | 6>(5);

  const [convalescenceTenure, setConvalescenceTenure] = useState<number>(4);
  const [convalescencePosition, setConvalescencePosition] = useState<number>(100);

  const [ageGroup, setAgeGroup] = useState<'adult' | 'youth18' | 'youth17' | 'youth16'>('adult');

  // Helpers
  const formatNIS = (val: number) => {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', maximumFractionDigits: 0 }).format(val);
  };

  // --- Calculations ---

  // 1. Split Shifts Calculations
  const splitActualHours = splitMorningHours + splitEveningHours;
  // Rule: 7 actual hours = 8 hours pay. If work <= 7 hours, pay = actual + (8 - 7) = actual + 1 (capped at 8).
  // If > 7 hours, hours up to 7 pay 8 hours. Hours beyond 7 are overtime.
  const splitOvertimeHours = Math.max(0, splitActualHours - 7);
  const splitRegularPaidHours = Math.min(splitActualHours, 7) + (splitActualHours >= 7 ? 1 : (splitActualHours / 7));
  const splitOvertime125 = Math.min(splitOvertimeHours, 2);
  const splitOvertime150 = Math.max(0, splitOvertimeHours - 2);
  const splitDailyPay = (8 * splitHourlyRate) + 
    (splitOvertime125 * splitHourlyRate * 1.25) + 
    (splitOvertime150 * splitHourlyRate * 1.5);
  const isSplitBreakExceeded = splitBreakHours > 3;
  const isSplitRestViolated = splitRestBetweenDays < 8;

  // 2. Weekend Shift Calculations
  const weekendRegularHours = Math.min(weekendHours, 8);
  const weekendOvertimeHours = Math.max(0, weekendHours - 8);
  const weekendOt175 = Math.min(weekendOvertimeHours, 2);
  const weekendOt200 = Math.max(0, weekendOvertimeHours - 2);
  const weekendTotalPay = 
    (weekendRegularHours * weekendBaseRate * (isHoliday ? 1.5 : 1.5)) +
    (weekendOt175 * weekendBaseRate * 1.75) +
    (weekendOt200 * weekendBaseRate * 2.0) +
    (isNightShift ? weekendBaseRate * 1.0 : 0); // night shift bonus 1 hour if 7h shift

  // 3. Eilat Tax & Allowance Calculations
  const isEilatTaxEligible = eilatResidencyMonths >= 12;
  const eilatTaxCeilingMonthly = 22350; // annual ~268,200 / 12
  const eilatEligibleIncome = Math.min(eilatGrossSalary, eilatTaxCeilingMonthly);
  const eilatTaxCreditMonthly = isEilatTaxEligible ? eilatEligibleIncome * 0.10 : 0;
  const eilatTaxCreditYearly = eilatTaxCreditMonthly * 12;

  const isEilatAllowanceEligible = eilatHotelTenureMonths >= 36;
  const eilatAllowanceAmount = isEilatAllowanceEligible ? (383.09 * (isFullPosition / 100)) : 0;

  // 4. Housing & Meals Deductions Calculations
  const maxHousingAllowed = roomMatesCount === 2 ? 450 : roomMatesCount === 3 ? 350 : 300;
  const maxUtilitiesAllowed = 145;
  const isHousingExceeded = housingDeduction > maxHousingAllowed;
  const isUtilitiesExceeded = utilitiesDeduction > maxUtilitiesAllowed;
  const totalDeductions = housingDeduction + utilitiesDeduction + mealsDeduction;

  // 5. Hotel Pension & Severance Calculations
  const isStudyFundEligible = hotelTenureMonthsForPension >= 36;
  const hotelPensionEmployerMonthly = hotelPensionSalary * 0.065;
  const hotelSeveranceEmployerMonthly = hotelPensionSalary * 0.0833;
  const hotelEmployeeMonthly = hotelPensionSalary * 0.06;
  const hotelStudyFundEmployerMonthly = isStudyFundEligible ? hotelPensionSalary * 0.075 : 0;
  const hotelStudyFundEmployeeMonthly = isStudyFundEligible ? hotelPensionSalary * 0.025 : 0;
  const totalEmployerMonthlySocials = hotelPensionEmployerMonthly + hotelSeveranceEmployerMonthly + hotelStudyFundEmployerMonthly;

  // 6. Core statutory helpers
  const totalStatTenure = statYears + statMonths / 12;
  const statutorySeverance = statSalary * totalStatTenure;
  const statCompletionOwed = statSection14Rate >= 8.33 ? 0 : Math.max(0, statutorySeverance - statFundBalance);

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
    };
    const row = tenureYears >= 11 ? { gross: 26, net5: 20 } : (table[tenureYears] || { gross: 16, net5: 12 });
    return daysPerWeek === 5 ? row.net5 : row.gross;
  };
  const calculatedVacationDays = getVacationDays(vacationTenure, workDaysPerWeek);

  const getConvalescenceDays = (tenureYears: number) => {
    if (tenureYears < 1) return 0;
    if (tenureYears === 1) return 5;
    if (tenureYears <= 3) return 6;
    if (tenureYears <= 10) return 7;
    return 8;
  };
  const baseConvalescenceDays = getConvalescenceDays(convalescenceTenure);
  const convalescencePay = baseConvalescenceDays * 451.50 * (convalescencePosition / 100);

  return (
    <div className="max-w-5xl mx-auto space-y-6" dir="rtl">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-2">
          <Calculator className="w-8 h-8 text-brand-600 dark:text-brand-400" />
          <span>מחשבוני שכר וזכויות ענף המלונאות</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          כלים אינטראקטיביים מדויקים לחישוב פיצול משמרות, תעריפי שבת, הטבות מס ותוספת אילת, ניכויי מגורים ופנסיה.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-slate-200/80 dark:bg-slate-800/80 rounded-2xl scrollbar-none border border-slate-300/60 dark:border-slate-700/60">
        
        {/* Hospitality Specific Tabs */}
        <button
          onClick={() => setActiveTab('split')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'split'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50'
          }`}
        >
          <Split className="w-4 h-4 text-indigo-400" />
          <span>פיצול משמרות (7=8)</span>
        </button>

        <button
          onClick={() => setActiveTab('weekend')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'weekend'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50'
          }`}
        >
          <Moon className="w-4 h-4 text-purple-400" />
          <span>שבת, חג ולילה (150%-200%)</span>
        </button>

        <button
          onClick={() => setActiveTab('eilat_tax')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition cursor-pointer ${
            activeTab === 'eilat_tax'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50'
          }`}
        >
          <Palmtree className="w-4 h-4 text-amber-600" />
          <span>הטבות מס ותוספת אילת</span>
        </button>

        <button
          onClick={() => setActiveTab('housing')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'housing'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50'
          }`}
        >
          <Home className="w-4 h-4 text-emerald-400" />
          <span>ניכויי מגורים וכלכלה</span>
        </button>

        <button
          onClick={() => setActiveTab('hotel_pension')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'hotel_pension'
              ? 'bg-brand-600 text-white shadow-xs'
              : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50'
          }`}
        >
          <PiggyBank className="w-4 h-4 text-sky-400" />
          <span>פנסיה והשתלמות מלונות</span>
        </button>

        {/* General Tabs */}
        <button
          onClick={() => setActiveTab('severance')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'severance'
              ? 'bg-slate-800 text-white shadow-xs'
              : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>פיצויים כללי</span>
        </button>

        <button
          onClick={() => setActiveTab('convalescence')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'convalescence'
              ? 'bg-slate-800 text-white shadow-xs'
              : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50'
          }`}
        >
          <Coffee className="w-4 h-4" />
          <span>הבראה 2026</span>
        </button>
      </div>

      {/* Tab 1: Split Shift Calculator */}
      {activeTab === 'split' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Split className="w-5 h-5 text-indigo-500" />
              <span>מחשבון פיצול משמרות במלונאות (כלל 7=8 שעות)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              לפי ההסכם הקיבוצי בענף המלונאות: יום מפוצל של 7 שעות בפועל מזכה בשכר 8 שעות מלאות! כל שעה מעבר ל-7 שעות בפועל נחשבת שעה נוספת (125%/150%).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                שעות עבודה מקטע בוקר (שעות):
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="8"
                value={splitMorningHours}
                onChange={(e) => setSplitMorningHours(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                שעות עבודה מקטע ערב (שעות):
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="8"
                value={splitEveningHours}
                onChange={(e) => setSplitEveningHours(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                שכר שעה בסיס (₪ לשעה):
              </label>
              <input
                type="number"
                min="35.40"
                value={splitHourlyRate}
                onChange={(e) => setSplitHourlyRate(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                אורך הפסקת הפיצול בין המקטעים (שעות):
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="8"
                value={splitBreakHours}
                onChange={(e) => setSplitBreakHours(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                מנוחה בין סיום המשמרת למשמרת הבאה (שעות):
              </label>
              <input
                type="number"
                step="0.5"
                min="4"
                max="16"
                value={splitRestBetweenDays}
                onChange={(e) => setSplitRestBetweenDays(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Alerts */}
          {isSplitBreakExceeded && (
            <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-2xl flex items-start gap-2.5 text-red-900 dark:text-red-200 text-xs">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div>
                <strong className="block font-bold">אזהרה: הפסקת הפיצול עולה על 3 שעות ({splitBreakHours} שעות)!</strong>
                ההסכם הקיבוצי אוסר הפסקה של מעל 3 שעות. שעות ההמתנה החורגות עלולות להיחשב לשעות עבודה בתשלום מלא!
              </div>
            </div>
          )}

          {isSplitRestViolated && (
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl flex items-start gap-2.5 text-amber-900 dark:text-amber-200 text-xs">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div>
                <strong className="block font-bold">הפרת חובת מנוחה: פחות מ-8 שעות רצופות בין ימי עבודה!</strong>
                סעיף 21 לחוק שעות עבודה ומנוחה מחייב מנוחה של לפחות 8 שעות רצופות בין יום עבודה אחד למשנהו. שיבוץ זה אינו חוקי.
              </div>
            </div>
          )}

          {/* Results Summary Box */}
          <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-3xl border border-slate-200 dark:border-slate-700/80 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 text-center">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-bold">שעות עבודה בפועל</span>
                <span className="text-xl font-black text-slate-900 dark:text-white font-mono">{splitActualHours} שעות</span>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 text-center">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-bold">שעות בסיס לתשלום</span>
                <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 font-mono">8.0 שעות</span>
                <span className="text-[9px] text-indigo-700 dark:text-indigo-300 block font-bold">(תגמול פיצול ענפי)</span>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 text-center">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-bold">שעות נוספות בפועל</span>
                <span className="text-xl font-black text-amber-600 dark:text-amber-400 font-mono">{splitOvertimeHours} שעות</span>
                <span className="text-[9px] text-slate-500 block">(מעבר ל-7 שעות)</span>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-950/80 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800 text-center">
                <span className="text-[11px] text-indigo-800 dark:text-indigo-300 block font-bold">סה"כ שכר ליום המפוצל</span>
                <span className="text-2xl font-black text-indigo-950 dark:text-white font-mono">{formatNIS(splitDailyPay)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Weekend & Holiday Hotel Calculator */}
      {activeTab === 'weekend' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Moon className="w-5 h-5 text-purple-500" />
              <span>מחשבון שבת, חג ומשמרת לילה במלונאות (150% - 200%)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              במלונות הפועלים 24/7: שעות רגילות בשבת משולמות ב-150%. שעות נוספות בשבת משולמות ב-175% ו-200% (הלכת כהן נ' עיריית נהריה).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                שכר שעה בסיס (₪):
              </label>
              <input
                type="number"
                min="35.40"
                value={weekendBaseRate}
                onChange={(e) => setWeekendBaseRate(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                שעות עבודה במשמרת השבת/חג:
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="12"
                value={weekendHours}
                onChange={(e) => setWeekendHours(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex flex-col justify-end space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isHoliday}
                  onChange={(e) => setIsHoliday(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4"
                />
                <span>האם המשמרת היא ביום חג רשמי? (+יום חלופי)</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNightShift}
                  onChange={(e) => setIsNightShift(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4"
                />
                <span>האם משמרת לילה (שעתיים בין 22:00-06:00)?</span>
              </label>
            </div>
          </div>

          {/* Breakdown Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-bold">שעות 1-8 (150%)</span>
              <span className="text-lg font-black text-slate-900 dark:text-white font-mono">{weekendRegularHours} שעות</span>
              <span className="text-xs text-purple-600 dark:text-purple-400 block font-bold">
                {formatNIS(weekendRegularHours * weekendBaseRate * 1.5)}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-bold">שעות 9-10 (175%)</span>
              <span className="text-lg font-black text-slate-900 dark:text-white font-mono">{weekendOt175} שעות</span>
              <span className="text-xs text-purple-600 dark:text-purple-400 block font-bold">
                {formatNIS(weekendOt175 * weekendBaseRate * 1.75)}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-bold">שעה 11+ (200%)</span>
              <span className="text-lg font-black text-slate-900 dark:text-white font-mono">{weekendOt200} שעות</span>
              <span className="text-xs text-purple-600 dark:text-purple-400 block font-bold">
                {formatNIS(weekendOt200 * weekendBaseRate * 2.0)}
              </span>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/80 p-4 rounded-2xl border border-purple-200 dark:border-purple-800 text-center">
              <span className="text-[11px] text-purple-800 dark:text-purple-300 block font-bold">סה"כ שכר משמרת שבת</span>
              <span className="text-2xl font-black text-purple-950 dark:text-white font-mono">{formatNIS(weekendTotalPay)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Eilat Tax & Allowance Calculator */}
      {activeTab === 'eilat_tax' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Palmtree className="w-5 h-5 text-amber-500" />
              <span>מחשבון הטבות מס אילת (10%) ותוספת אילת (383.09 ₪)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              זיכוי מס 10% לתושבי אילת לפי סעיף 11 לפקודת מס הכנסה (מגורים מעל 12 חודשים) ותוספת אילת ענפית לפי ההסכם הקיבוצי.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                שכר חודשי ברוטו (₪):
              </label>
              <input
                type="number"
                step="500"
                min="5000"
                value={eilatGrossSalary}
                onChange={(e) => setEilatGrossSalary(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                חודשי מגורים רצופים באילת:
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={eilatResidencyMonths}
                onChange={(e) => setEilatResidencyMonths(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-900 dark:text-white"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">זכאות מעל 12 חודשים</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                ותק עבודה במלון (חודשים):
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={eilatHotelTenureMonths}
                onChange={(e) => setEilatHotelTenureMonths(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-900 dark:text-white"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">זכאות מעל 36 חודשים</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                היקף משרה (%):
              </label>
              <input
                type="number"
                min="20"
                max="100"
                value={isFullPosition}
                onChange={(e) => setIsFullPosition(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            
            <div className={`p-5 rounded-3xl border ${
              isEilatTaxEligible
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">זיכוי מס 10% (סעיף 11)</span>
                {isEilatTaxEligible ? (
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold">זכאי</span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full font-bold">נדרש 12 חודשים</span>
                )}
              </div>
              <span className="text-2xl font-black text-amber-950 dark:text-white font-mono mt-2 block">
                {formatNIS(eilatTaxCreditMonthly)} <span className="text-xs font-normal">לחודש</span>
              </span>
              <span className="text-xs text-amber-800 dark:text-amber-300 mt-1 block font-semibold">
                חיסכון שנתי של עד {formatNIS(eilatTaxCreditYearly)} נטו
              </span>
            </div>

            <div className={`p-5 rounded-3xl border ${
              isEilatAllowanceEligible
                ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">תוספת אילת (הסכם ענפי)</span>
                {isEilatAllowanceEligible ? (
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold">זכאי</span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full font-bold">נדרש 36 חודשי ותק</span>
                )}
              </div>
              <span className="text-2xl font-black text-sky-950 dark:text-white font-mono mt-2 block">
                {formatNIS(eilatAllowanceAmount)} <span className="text-xs font-normal">לחודש</span>
              </span>
              <span className="text-xs text-sky-800 dark:text-sky-300 mt-1 block font-semibold">
                תעריף מעודכן 383.09 ₪ למשרה מלאה
              </span>
            </div>

            <div className="p-5 bg-emerald-50 dark:bg-emerald-950/40 rounded-3xl border border-emerald-300 dark:border-emerald-800">
              <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 block">סה"כ הטבה חודשית ישירה</span>
              <span className="text-2xl font-black text-emerald-950 dark:text-white font-mono mt-2 block">
                {formatNIS(eilatTaxCreditMonthly + eilatAllowanceAmount)}
              </span>
              <span className="text-xs text-emerald-800 dark:text-emerald-200 mt-1 block">
                תוספת כספית ישירה לנטו החודשי
              </span>
            </div>

          </div>
        </div>
      )}

      {/* Tab 4: Housing & Meals Deductions Calculator */}
      {activeTab === 'housing' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Home className="w-5 h-5 text-emerald-500" />
              <span>בדיקת תקרות ניכוי מגורים וכלכלה (הגנת שכר)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              בדוק האם הניכויים שהמלון מוריד לך מהמשכורת בגין חדר, חשמל, מים וארוחות עומדים בתקרות החוקיות המותרות בתקנות שכר מינימום.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                מספר שותפים בחדר במגורים:
              </label>
              <select
                value={roomMatesCount}
                onChange={(e) => setRoomMatesCount(Number(e.target.value) as 2 | 3 | 4)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white"
              >
                <option value={2}>2 שותפים (עד ~450 ₪ לחודש)</option>
                <option value={3}>3 שותפים (עד ~350 ₪ לחודש)</option>
                <option value={4}>4+ שותפים (עד ~300 ₪ לחודש)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                סכום ניכוי דיור בפועל בתלוש (₪):
              </label>
              <input
                type="number"
                value={housingDeduction}
                onChange={(e) => setHousingDeduction(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                סכום ניכוי חשבונות/הוצאות (₪):
              </label>
              <input
                type="number"
                value={utilitiesDeduction}
                onChange={(e) => setUtilitiesDeduction(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-900 dark:text-white"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">תקרה חוקית: כ-145 ₪</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                סכום ניכוי ארוחות/כלכלה (₪):
              </label>
              <input
                type="number"
                value={mealsDeduction}
                onChange={(e) => setMealsDeduction(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Validation Status */}
          <div className="space-y-3 pt-2">
            {isHousingExceeded ? (
              <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-2xl flex items-start gap-2.5 text-xs text-red-900 dark:text-red-200">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div>
                  <strong className="block font-bold">ניכוי הדיור חורג מהתקרה המותרת בחוק!</strong>
                  המלון מנכה {housingDeduction} ₪ בעוד שהתקרה המותרת עבור חדר עם {roomMatesCount} שותפים היא כ-{maxHousingAllowed} ₪ בלבד.
                  פער של {housingDeduction - maxHousingAllowed} ₪ מהווה ניכוי בלתי חוקי לפי חוק הגנת השכר!
                </div>
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-2 text-xs text-emerald-900 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>ניכוי הדיור עומד במגבלות התקנות המפוקחות (מתחת לתקרה של {maxHousingAllowed} ₪).</span>
              </div>
            )}

            {isUtilitiesExceeded ? (
              <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-2xl flex items-start gap-2.5 text-xs text-red-900 dark:text-red-200">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div>
                  <strong className="block font-bold">ניכוי החשבונות הנלווים חורג מהתקרה המרבית!</strong>
                  המלון מנכה {utilitiesDeduction} ₪ על הוצאות נלוות, מעבר לתקרה הקשיחה של כ-{maxUtilitiesAllowed} ₪.
                </div>
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-2 text-xs text-emerald-900 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>ניכוי ההוצאות הנלוות עומד בתקרה המותרת בחוק.</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Hotel Pension & Severance Calculator */}
      {activeTab === 'hotel_pension' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-sky-500" />
              <span>מחשבון פנסיה (6.5%), פיצויים (8.33%) והשתלמות (7.5%) במלונאות</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              חישוב הפקדות סוציאליות מלאות בהתאם להסכם הקיבוצי בענף המלונאות 2023-2026.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                שכר מבוטח קובע לפנסיה (₪):
              </label>
              <input
                type="number"
                step="500"
                min="6443.85"
                value={hotelPensionSalary}
                onChange={(e) => setHotelPensionSalary(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                ותק במלון (חודשים):
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={hotelTenureMonthsForPension}
                onChange={(e) => setHotelTenureMonthsForPension(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-900 dark:text-white"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">זכאות לקרן השתלמות מעל 36 חודשים</span>
            </div>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-bold">תגמולי מעסיק (6.5%)</span>
              <span className="text-xl font-black text-slate-900 dark:text-white font-mono">{formatNIS(hotelPensionEmployerMonthly)}</span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-bold">פיצויים מלאים (8.33%)</span>
              <span className="text-xl font-black text-brand-600 dark:text-brand-400 font-mono">{formatNIS(hotelSeveranceEmployerMonthly)}</span>
              <span className="text-[9px] text-brand-700 dark:text-brand-300 block font-bold">100% סעיף 14 ענפי</span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-bold">קרן השתלמות מעסיק (7.5%)</span>
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {isStudyFundEligible ? formatNIS(hotelStudyFundEmployerMonthly) : '0 ₪'}
              </span>
              <span className="text-[9px] text-slate-500 block">
                {isStudyFundEligible ? 'זכאי (עובד מפריש 2.5%)' : 'טרם השלים 36 חודש'}
              </span>
            </div>

            <div className="bg-brand-50 dark:bg-brand-950/80 p-4 rounded-2xl border border-brand-200 dark:border-brand-800 text-center">
              <span className="text-[11px] text-brand-800 dark:text-brand-300 block font-bold">סה"כ הפקדות מעסיק חודשיות</span>
              <span className="text-2xl font-black text-brand-950 dark:text-white font-mono">{formatNIS(totalEmployerMonthlySocials)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: General Statutory Severance */}
      {activeTab === 'severance' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-slate-600" />
              <span>מחשבון פיצויי פיטורים ובדיקת השלמת סעיף 14</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                משכורת חודשית אחרונה (₪):
              </label>
              <input
                type="number"
                step="500"
                value={statSalary}
                onChange={(e) => setStatSalary(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                שנות ותק:
              </label>
              <input
                type="number"
                min="0"
                max="40"
                value={statYears}
                onChange={(e) => setStatYears(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                חודשים נוספים:
              </label>
              <input
                type="number"
                min="0"
                max="11"
                value={statMonths}
                onChange={(e) => setStatMonths(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-3xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-bold">חבות פיצויים סטטוטורית מלאה (חודש לשנה)</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-2 block">{formatNIS(statutorySeverance)}</span>
            </div>

            <div className="p-5 bg-brand-50 dark:bg-brand-950/60 rounded-3xl border border-brand-200 dark:border-brand-800">
              <span className="text-xs text-brand-800 dark:text-brand-300 block font-bold">תקרת פטור ממס (13,750 ₪ לשנה)</span>
              <span className="text-2xl font-black text-brand-950 dark:text-white font-mono mt-2 block">{formatNIS(Math.min(13750 * totalStatTenure, statutorySeverance))}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 7: Convalescence 2026 */}
      {activeTab === 'convalescence' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Coffee className="w-5 h-5 text-amber-600" />
              <span>מחשבון דמי הבראה 2026 (תעריף 451.50 ₪)</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                שנות ותק במקום העבודה:
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={convalescenceTenure}
                onChange={(e) => setConvalescenceTenure(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                היקף משרה (%):
              </label>
              <input
                type="number"
                min="20"
                max="100"
                value={convalescencePosition}
                onChange={(e) => setConvalescencePosition(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="p-5 bg-amber-50 dark:bg-amber-950/40 rounded-3xl border border-amber-300 dark:border-amber-800 text-center">
            <span className="text-xs text-amber-900 dark:text-amber-300 block font-bold">
              ימי זכאות: {baseConvalescenceDays} ימים × 451.50 ₪
            </span>
            <span className="text-3xl font-black text-amber-950 dark:text-white font-mono mt-2 block">
              {formatNIS(convalescencePay)}
            </span>
          </div>
        </div>
      )}

    </div>
  );
};
