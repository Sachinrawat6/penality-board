import React, { useState } from 'react';
import { StatCard } from '../components/StatCard';
import { ClipboardList, TrendingUp, UserRound } from 'lucide-react';

const StatPage = () => {
  const [employees, setEmployees] = useState([]);
  const [allMistakes, setAllMistakes] = useState(0);
  const topEmployee = employees[0];
  return (
    <section className="mb-6">
      <div className="mb-5">
        <p className="mb-1 text-sm font-medium text-slate-500">Overview</p>
        <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Mistake Analytics
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={<ClipboardList size={20} />}
          label="Total Mistakes"
          value={allMistakes}
          helper="Selected date range"
        />
        <StatCard
          icon={<UserRound size={20} />}
          label="Employees"
          value={employees.length}
          helper="With recorded mistakes"
        />
        <StatCard
          icon={<TrendingUp size={20} />}
          label="Highest Count"
          value={topEmployee?.totalMistakes || 0}
          helper={topEmployee?.name || 'No records'}
        />
      </div>
    </section>
  );
};

export default StatPage;
