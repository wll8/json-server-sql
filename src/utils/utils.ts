export function isObject(value: unknown) {
  return value !== null && typeof value === 'object';
}

export function isNotEmptyArray(value: unknown) {
  return Array.isArray(value) && value.length > 0;
}
