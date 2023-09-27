export const getBaseUrl = () => {
  return process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_BASE_URL_DEVELOPMENT
    : process.env.VERCEL_URL;
};