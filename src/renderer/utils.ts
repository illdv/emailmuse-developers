export interface IKeyValue<K,V> {
  key: K;
  value: V;
}

export function useOrDefault(func: () => any, defaultValue: string) {
  try {
    return func();
  } catch (e) {
    return defaultValue;
  }
}