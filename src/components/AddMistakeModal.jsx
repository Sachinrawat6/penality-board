import { AlertCircle, Calendar, Check, ImagePlus, Loader2, UserRound, X } from 'lucide-react';
import { Field } from './Field';

export function AddMistakeModal({ form, setForm, loading, onClose, onSubmit }) {
  return (
    <div
      className=" inset-0 z-50 flex items-end justify-center p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-mistake-title"
    >
      <div className="w-full max-w-lg overflow-hidden bg-white  sm:rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h3 id="add-mistake-title" className="font-semibold text-slate-900">
              Add Mistake
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">Record a new employee mistake.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close"
          ></button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4 p-5">
          <Field
            label="Employee Name"
            placeholder="e.g. Rahul"
            value={form.name}
            onChange={(value) => setForm((current) => ({ ...current, name: value }))}
            icon={<UserRound size={17} />}
            required
          />

          <Field
            label="Mistake"
            placeholder="e.g. Wrong cutting"
            value={form.mistake}
            onChange={(value) => setForm((current) => ({ ...current, mistake: value }))}
            icon={<AlertCircle size={17} />}
            required
          />
          <Field
            label="Mistake Date"
            value={form.mistake_date}
            type="date"
            onChange={(value) => setForm((current) => ({ ...current, mistake_date: value }))}
            icon={<Calendar size={17} />}
            required
          />

          <Field
            label="Mistake Image URL"
            placeholder="https://..."
            value={form.mistake_image}
            onChange={(value) => setForm((current) => ({ ...current, mistake_image: value }))}
            icon={<ImagePlus size={17} />}
          />

          {/* Actions */}
          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? <Loader2 size={17} className="animate-spin" /> : <Check size={17} />}
              {loading ? 'Saving...' : 'Save Mistake'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
