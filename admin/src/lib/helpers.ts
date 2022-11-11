/**
 * Return a deep copy of a given object. Object must be serializable
 * @param obj
 * @returns
 */
export function deepCopy<T>(obj: T) {
  return JSON.parse(JSON.stringify(obj)) as T;
}
