import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-3 p-8 text-slate-400">
      <Loader2 size={28} className="animate-spin" />
      <p className="text-sm">Loading report...</p>
    </div>
  );
}
