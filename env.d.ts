export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_URL: string;
      PORT: string;
    }
  }
}