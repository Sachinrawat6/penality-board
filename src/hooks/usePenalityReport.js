import { useCallback, useState } from 'react';
import { getPenalityReport } from '../services/penalityBoard.service';

export const usePenalityReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [penalityData, setPenalityData] = useState({
    employees: [],
    allMistakes: 0,
  });

  const fetchPenalityReport = useCallback(async (from, to) => {
    try {
      setLoading(true);
      setError(null);

      const response = await getPenalityReport(from, to);
      const payload = response?.data?.data[0];

      let employees = [];
      let allMistakes = 0;

      if (Array.isArray(payload)) {
        employees = payload;
        allMistakes = payload.reduce((sum, item) => sum + Number(item.totalMistakes || 0), 0);
      } else {
        employees = Array.isArray(payload?.employees) ? payload.employees : [];
        allMistakes = Number(payload?.allMistakes || 0);
      }

      setPenalityData({ employees, allMistakes });
      return { employees, allMistakes };
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Something went wrong';
      setError(message);
      setPenalityData({ employees: [], allMistakes: 0 });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    penalityData,
    fetchPenalityReport,
  };
};
