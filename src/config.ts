export const API_URL =
  process.env.NODE_ENV && process.env.NODE_ENV
    ? `http://${window.location.hostname}:5000/api/`
    : `https://${window.location.hostname}/api/`;
