export function excludeField<T, Key extends keyof T>(
  item: T,
  keys: Key[],
): Omit<T, Key> {
  return Object.fromEntries(
    Object.entries(item).filter(([key]) => !keys.some((k) => k === key)),
  ) as Omit<T, Key>;
}
