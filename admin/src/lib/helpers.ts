/**
 * Return a deep copy of a given object. Object must be serializable
 * @param obj
 * @returns
 */
export function deepCopy<T>(obj: T) {
  return JSON.parse(JSON.stringify(obj)) as T;
}

/**
 * Add an 's' to {text} depending on count
 * @param count
 * @param text
 */
export function plural(count: number, text: string) {
  return `${count} ${text}${count > 1 ? "s" : ""}`;
}
