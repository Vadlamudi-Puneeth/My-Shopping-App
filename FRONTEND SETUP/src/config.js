// Default configuration for local development
export const config = {
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3333/api/v1"
};
