export function isObject(target) {
  return typeof target === 'object' && target !== null;
}

export function hasChange(oldValue, newValue) {
  return !Object.is(oldValue, newValue);
}