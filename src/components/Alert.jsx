import { AlertCircle, Check, X } from 'lucide-react';

export function Alert({ type, message, onClose }) {
  const success = type === 'success';

  return (
    <div
      className={`mb-5 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
        success
          ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
          : 'border-red-200 bg-red-50 text-red-800'
      }`}
    >
      {success ? (
        <Check size={18} className="mt-0.5 shrink-0" />
      ) : (
        <AlertCircle size={18} className="mt-0.5 shrink-0" />
      )}
      <p className="flex-1">{message}</p>
      <button onClick={onClose} className="shrink-0 opacity-60 hover:opacity-100">
        <X size={17} />
      </button>
    </div>
  );
}
