/**
 * Return a deep copy of a given object. Object must be serializable
 * @param obj
 * @returns
 */
export function deepCopy(obj: object) {
  return JSON.parse(JSON.stringify(obj));
}
