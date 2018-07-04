export function useOrDefault<T>(func: () => T, defaultValue: T): T {
  try {
    return func();
  } catch (e) {
    return defaultValue;
  }
}

export interface IKeyPair<V = string> {
  [key: string]: V;
}
