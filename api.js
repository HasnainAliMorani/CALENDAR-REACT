import axios from 'axios';

const API_URL = 'http://localhost:5000/events'; // replace with your API endpoint

export const fetchEvents = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addEvent = async (event) => {
  const res = await axios.post(API_URL, event);
  return res.data;
};
