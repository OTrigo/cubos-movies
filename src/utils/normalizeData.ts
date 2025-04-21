export const normalizeValue = (
  value: FormDataEntryValue | null
): string | undefined => {
  if (value === null || value === "") return undefined;
  return String(value);
};
