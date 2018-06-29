import { ActionCreatorsMapObject, bindActionCreators } from 'redux';

export function useOrDefault<T>(func: () => T, defaultValue: T): T {
  try {
    return func();
  } catch (e) {
    return defaultValue;
  }
}

// TODO: fix any
/**
 * Use for map dispatch actions from Module.
 */
export function bindModuleAction(moduleActions: any, dispatch: any): ActionCreatorsMapObject {
  return Object.entries(moduleActions).reduce((result, [key, value]): ActionCreatorsMapObject => {
    return { ...result, [key]: bindActionCreators(value as any, dispatch) };
  }, {});
}
