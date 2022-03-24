/*
 * Client Configuration
 *
 */
export const clientConfig = {
  endpoint: {
    web:
      process.env.NEXT_PUBLIC_NODE_ENV === 'production'
        ? 'http://27.35.75.58:3032'
        : 'http://127.0.0.1:3032',
    api:
      process.env.NEXT_PUBLIC_NODE_ENV === 'production'
        ? 'http://27.35.75.58:3031/api'
        : 'http://127.0.0.1:3032/api',
  },
};
