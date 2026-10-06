export function StatCard({ icon, label, value, helper }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          {icon}
        </div>
      </div>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <div className="mt-1 flex items-end gap-2">
        <p className="text-3xl font-bold tracking-tight text-slate-950">{value}</p>
      </div>
      <p className="mt-1 truncate text-xs text-slate-400">{helper}</p>
    </div>
  );
}
