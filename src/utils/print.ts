export const print = (prefix: string, msg: string) => {
  console.log(prefix, msg);
};
export const redis_log = (msg: string, prefix?: string) =>
  console.log(`[Redis:Consumer${prefix ? `:${prefix}` : ''}]`, msg);
export const grpc_client_log = (msg: string, prefix?: string) =>
  console.log(`[GRPC:Client${prefix ? `:${prefix}` : ''}]`, msg);
export const grpc_server_log = (msg: string, prefix?: string) =>
  console.log(`[GRPC:Server${prefix ? `:${prefix}` : ''}]`, msg);
