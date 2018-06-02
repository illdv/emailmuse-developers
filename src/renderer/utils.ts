export function useOrDefault(func: () => any, defaultValue: any) {
  try {
    return func();
  } catch (e) {
    return defaultValue;
  }
}
