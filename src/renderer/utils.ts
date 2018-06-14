export function useOrDefault<T>(func: () => T, defaultValue: T): T {
  try {
    return func();
  } catch (e) {
    return defaultValue;
  }
}
