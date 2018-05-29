export interface IKeyValue<K, V> {
  key: K;
  value: V;
}

export function useOrDefault(func: () => any, defaultValue: any) {
  try {
    return func();
  } catch (e) {
    return defaultValue;
  }
}
