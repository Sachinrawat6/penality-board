import { CalendarDays } from 'lucide-react';

export function DateInput({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</span>
      <div className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-100">
        <CalendarDays size={17} className="shrink-0 text-slate-400" />
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-sm text-slate-700 outline-none"
        />
      </div>
    </label>
  );
}
