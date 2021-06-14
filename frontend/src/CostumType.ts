export type authType = {
  user: string;
  signin: { (): void; (...args: any[]): void };
  signout: { (): void; (...args: any[]): void };
};
