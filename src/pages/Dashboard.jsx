import { useEffect, useMemo, useState } from 'react';
import { BarChart3, CalendarDays, Loader2, Search, X } from 'lucide-react';

import { DateInput } from '../components/DateInput';
import { LoadingState } from '../components/LoadingState';
import { Alert } from '../components/Alert';
import { EmployeeRow } from '../components/EmployeeRow';
import { EmptyState } from '../components/EmptyState';
import StatPage from '../pages/StatPage';
import { usePenalityReport } from '../hooks/usePenalityReport';

/**
 * Get today's date in YYYY-MM-DD format.
 *
 * Uses the browser's local timezone so the date shown in the
 * date inputs matches the user's local date.
 */
function todayString() {
  const date = new Date();
  const offset = date.getTimezoneOffset();

  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10);
}

function Dashboard() {
  const today = todayString();

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState({});
  const [rangeError, setRangeError] = useState('');

  const { loading, error, penalityData, fetchPenalityReport } = usePenalityReport();

  const { employees = [], allMistakes = 0 } = penalityData;

  /**
   * Initial report load
   */
  useEffect(() => {
    fetchPenalityReport(today, today);
  }, [fetchPenalityReport, today]);

  /**
   * Filter employees by search query
   */
  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return employees;
    }

    return employees.filter((employee) =>
      String(employee?.name || '')
        .toLowerCase()
        .includes(query)
    );
  }, [employees, search]);

  /**
   * Validate date range
   */
  const validateDateRange = () => {
    if (!startDate || !endDate) {
      setRangeError('Please select both start date and end date.');
      return false;
    }

    if (startDate > endDate) {
      setRangeError('Start date cannot be after end date.');
      return false;
    }

    setRangeError('');

    return true;
  };

  /**
   * Apply date filter
   */
  const handleDateFilter = async (event) => {
    event.preventDefault();

    if (!validateDateRange()) {
      return;
    }

    try {
      await fetchPenalityReport(startDate, endDate);

      // Close all expanded employees after changing the report.
      setExpanded({});
    } catch {
      // Error is already handled inside usePenalityReport.
    }
  };

  /**
   * Reset report to today's data
   */
  const handleToday = async () => {
    const currentToday = todayString();

    setStartDate(currentToday);
    setEndDate(currentToday);
    setRangeError('');
    setSearch('');
    setExpanded({});

    try {
      await fetchPenalityReport(currentToday, currentToday);
    } catch {
      // Error is already handled inside usePenalityReport.
    }
  };

  /**
   * Expand / collapse employee row
   */
  const toggleEmployee = (name) => {
    setExpanded((current) => ({
      ...current,
      [name]: !current[name],
    }));
  };

  /**
   * Clear employee search
   */
  const handleClearSearch = () => {
    setSearch('');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Error messages */}
        {rangeError && (
          <div className="mb-4">
            <Alert type="error" message={rangeError} onClose={() => setRangeError('')} />
          </div>
        )}

        {error && (
          <div className="mb-4">
            <Alert type="error" message={error} onClose={() => {}} />
          </div>
        )}

        {/* Statistics */}
        {/* <StatPage /> */}

        {/* Filter section */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex flex-col gap-1">
            <h3 className="font-semibold text-slate-900">Filter Report</h3>

            <p className="text-xs text-slate-500">
              Choose a date range to view employee-wise mistakes.
            </p>
          </div>

          <form onSubmit={handleDateFilter} className="grid gap-3 md:grid-cols-[1fr_1fr_auto_auto]">
            {/* From */}
            <DateInput
              label="From"
              value={startDate}
              onChange={(value) => {
                setStartDate(value);
                setRangeError('');
              }}
            />

            {/* To */}
            <DateInput
              label="To"
              value={endDate}
              onChange={(value) => {
                setEndDate(value);
                setRangeError('');
              }}
            />

            {/* Apply */}
            <button
              type="submit"
              disabled={loading}
              className="mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? <Loader2 size={17} className="animate-spin" /> : <BarChart3 size={17} />}

              {loading ? 'Loading...' : 'Apply'}
            </button>

            {/* Today */}
            <button
              type="button"
              onClick={handleToday}
              disabled={loading}
              className="mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CalendarDays size={17} />
              Today
            </button>
          </form>
        </section>

        {/* Employee report */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">Employee Report</h3>

              <p className="mt-1 text-xs text-slate-500">
                Employees are ranked by total mistake count
                {allMistakes > 0 &&
                  ` • ${allMistakes} total ${allMistakes === 1 ? 'mistake' : 'mistakes'}`}
              </p>
            </div>

            {/* Search */}
            <div className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 lg:w-72">
              <Search size={17} className="shrink-0 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search employee..."
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />

              {search && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="rounded-md p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <LoadingState />
          ) : filteredEmployees.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredEmployees.map((employee, index) => {
                const name = employee?.name || 'Unknown';
                const isOpen = Boolean(expanded[name]);

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
