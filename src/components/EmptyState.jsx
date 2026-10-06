import { ClipboardList } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <ClipboardList size={22} />
      </div>
      <h4 className="font-semibold text-slate-800">No mistakes found</h4>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        There are no penalty records for the selected date range.
      </p>
    </div>
  );
}
