namespace CustomStorage {
  export function setItem(key: string, value: string, isRemembered: boolean) {
    if (isRemembered) {
      localStorage.setItem(key, value);
    } else {
      sessionStorage.setItem(key, value);
    }
    return value;
  }

  type setItemWithTimer = { key: string, value: string, isRemembered: boolean, time: number };

  export function setItemWithTimer(payload: setItemWithTimer) {
    const { key, value, isRemembered, time } = payload;
    const timeKey = `time_${key}`;
    if (isRemembered) {
      localStorage.setItem(key, value);
      localStorage.setItem(timeKey, String(time));
      sessionStorage.setItem(key, value);
      sessionStorage.setItem(timeKey, String(time));
    } else {
      sessionStorage.setItem(key, value);
      sessionStorage.setItem(timeKey, String(time));
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
