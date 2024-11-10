import axios from './axiosConfig';

export const registerBatch = (data) => axios.post('/fabricante/registerBatch', data);
export const initiateShipment = (data) => axios.post('/distribuidor/initiateShipment', data);
export const validateAuthenticity = (data) => axios.post('/auditor/validateAuthenticity', data);
export const validateMedication = (data) => axios.post('/consumidor/validateMedication', data);

export const updateEvent = async (batchID, location, temperature, humidity, timestamp) => {
  return axios.post('/distribuidor/updateEvent', { batchID, location, temperature, humidity, timestamp });
};

