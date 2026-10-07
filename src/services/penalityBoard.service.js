import { api } from '../api/api.js';

const getPenalityReport = async (from, to) => {
  try {
    const params = {};
    if (from) {
      params.startDate = from;
    }
    if (to) {
      params.endDate = to;
    }
    const response = await api.get('/penality-boards/report', { params });
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch penalty report: ${error.message}`);
  }
};
const addMistake = async (payload) => {
  try {
    const mistakePayload = {
      name: payload.name,
      mistake: payload.mistake,
      mistake_image: payload.mistake_image || null,
      mistake_date: payload.mistake_date,
    };
    const response = await api.post('/penality-boards', mistakePayload);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to add mistake error :: ${error.message}`);
  }
};

export { getPenalityReport, addMistake };
