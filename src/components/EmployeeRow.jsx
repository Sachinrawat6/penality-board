import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

export function EmployeeRow({ employee, index, isOpen, onToggle }) {
  const mistakes = Array.isArray(employee.mistakes) ? employee.mistakes : [];
  const maxCount = Math.max(...mistakes.map((item) => Number(item.count || 0)), 1);

  return (
    <div>
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-slate-50 sm:p-5"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-700">
          {index + 1}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-slate-900">{employee.name || 'Unknown'}</p>
          <p className="mt-0.5 text-xs text-slate-500">
            {mistakes.length} mistake type{mistakes.length === 1 ? '' : 's'}
          </p>
        </div>

        <div className="mr-1 text-right">
          <p className="text-xl font-bold text-slate-950">{employee.totalMistakes || 0}</p>
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Total</p>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {isOpen && (
        <div className="bg-slate-50 px-4 pb-5 sm:px-5">
          <div className="rounded-xl border border-slate-200 bg-white">
            {mistakes.length === 0 ? (
              <p className="p-4 text-sm text-slate-500">No mistake details available.</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {[...mistakes]
                  .sort((a, b) => Number(b.count || 0) - Number(a.count || 0))
                  .map((item, mistakeIndex) => (
                    <div
                      key={`${item.mistake}-${mistakeIndex}`}
                      className="flex items-center gap-3 p-4"
                    >
                      {item.mistake_image ? (
                        <img
                          src={item.mistake_image}
                          alt=""
                          className="h-10 w-10 rounded-lg object-cover ring-1 ring-slate-200"
                        />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                          <AlertCircle size={18} />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="truncate text-sm font-medium text-slate-800">
                            {item.mistake || 'Unknown mistake'}
                          </p>
                          <span className="shrink-0 text-sm font-bold text-slate-900">
                            {item.count || 0}
                          </span>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-slate-700 transition-all"
                            style={{
                              width: `${Math.max(6, (Number(item.count || 0) / maxCount) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
