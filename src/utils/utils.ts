export function isObject(value: any) {
  return value !== null && typeof value === 'object';
}

export function isNotEmptyArray(value: any) {
  return Array.isArray(value) && value.length > 0;
}
