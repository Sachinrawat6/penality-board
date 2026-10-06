import { useState } from 'react';
import { addMistake } from '../services/penalityBoard.service.js';

export const useAddMistake = () => {
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);
  const [mistake, setMistake] = useState(null);

  const addMistakeToPenaltyBoard = async (payload) => {
    try {
      setAdding(true);
      setError(null);
      const data = await addMistake(payload);
      console.log(data);
      setMistake(data);
      return data;
    } catch (err) {
      setError(err?.message || 'Something went wrong');
      throw err;
    } finally {
      setAdding(false);
    }
  };

  return { adding, error, mistake, addMistakeToPenaltyBoard };
};
