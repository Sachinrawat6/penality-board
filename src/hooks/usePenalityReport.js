import { useCallback, useState } from 'react';
import { getPenalityReport } from '../services/penalityBoard.service.js';
export const usePenalityReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [penalityData, setPenalityData] = useState({ employees: [], allMistakes: 0 });
  const fetchPenalityReport = useCallback(async (from, to) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getPenalityReport(from, to);
      /** * Backend response: * * { * statusCode: 200, * data: { * allMistakes: 10, * employees: [...] * }, * message: "Mistake report fetched successfully" * } */ const payload =
        response?.data?.data;
      const employees = Array.isArray(payload?.employees) ? payload.employees : [];
      const allMistakes = Number(payload?.allMistakes || 0);
      const result = { employees, allMistakes };
      setPenalityData(result);
      return result;
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
  return { loading, error, penalityData, fetchPenalityReport };
};
