import { useEffect, useMemo, useState } from 'react';
import { BarChart3, CalendarDays, Loader2, Search } from 'lucide-react';

import { DateInput } from '../components/DateInput';
import { LoadingState } from '../components/LoadingState';
import { Alert } from '../components/Alert';
import { EmployeeRow } from '../components/EmployeeRow';
import { EmptyState } from '../components/EmptyState';
import StatPage from '../pages/StatPage';
import { usePenalityReport } from '../hooks/usePenalityReport';

function todayString() {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10);
}

function Dashboard() {
  const [startDate, setStartDate] = useState(todayString());
  const [endDate, setEndDate] = useState(todayString());
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState({});
  const [rangeError, setRangeError] = useState('');

  const { loading, error, penalityData, fetchPenalityReport } = usePenalityReport();

  const { employees, allMistakes } = penalityData;

  // Initial load (today)
  useEffect(() => {
    fetchPenalityReport(startDate, endDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return employees;

    return employees.filter((employee) =>
      String(employee.name || '')
        .toLowerCase()
        .includes(query)
    );
  }, [employees, search]);

  const handleDateFilter = (event) => {
    event.preventDefault();

    if (startDate && endDate && startDate > endDate) {
      setRangeError('Start date cannot be after end date.');
      return;
    }

    setRangeError('');
    fetchPenalityReport(startDate, endDate);
  };

  const handleToday = () => {
    const today = todayString();
    setStartDate(today);
    setEndDate(today);
    setRangeError('');
    fetchPenalityReport(today, today);
  };

  const toggleEmployee = (name) => {
    setExpanded((current) => ({
      ...current,
      [name]: !current[name],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {rangeError && (
          <Alert type="error" message={rangeError} onClose={() => setRangeError('')} />
        )}

        {error && <Alert type="error" message={error} onClose={() => {}} />}

        <StatPage />

        {/* Filter section */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex flex-col gap-1">
            <h3 className="font-semibold text-slate-900">Filter Report</h3>
            <p className="text-xs text-slate-500">
              Choose a date range to view employee-wise mistakes.
            </p>
          </div>

          <form onSubmit={handleDateFilter} className="grid gap-3 md:grid-cols-[1fr_1fr_auto_auto]">
            <DateInput label="From" value={startDate} onChange={setStartDate} />
            <DateInput label="To" value={endDate} onChange={setEndDate} />

            <button
              type="submit"
              disabled={loading}
              className="mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? <Loader2 className="animate-spin" size={17} /> : <BarChart3 size={17} />}
              Apply
            </button>

            <button
              type="button"
              onClick={handleToday}
              className="mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <CalendarDays size={17} />
              Today
            </button>
          </form>
        </section>

        {/* Employee report */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">Employee Report</h3>
              <p className="mt-1 text-xs text-slate-500">
                Employees are ranked by total mistake count
                {allMistakes > 0 && ` • ${allMistakes} total mistakes`}
              </p>
            </div>

            <div className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 lg:w-72">
              <Search size={17} className="shrink-0 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search employee..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {loading ? (
            <LoadingState />
          ) : filteredEmployees.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredEmployees.map((employee, index) => {
                const name = employee.name || 'Unknown';
                const isOpen = !!expanded[name];

                return (
                  <EmployeeRow
                    key={`${name}-${index}`}
                    employee={employee}
                    index={index}
                    isOpen={isOpen}
                    onToggle={() => toggleEmployee(name)}
                  />
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
