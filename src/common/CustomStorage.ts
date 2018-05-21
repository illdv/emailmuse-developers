namespace CustomStorage {
  export function setItem(key: string, value: string, isRemembered: boolean) {
    if (isRemembered) {
      localStorage.setItem(key, value);
    } else {
      sessionStorage.setItem(key, value);
    }
    return value;
  }
  export function getItem(key: string) {
    return sessionStorage.getItem(key) || localStorage.getItem(key);
  }
  export function clear() {
    sessionStorage.clear();
    localStorage.clear();
  }
  export function removeItem(key: string) {
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
  }
}
export default CustomStorage;
