export const kebabCaseToCapitalize = (value: string): string => {
  if (!value) return "";
  return `${value[0]?.toUpperCase()}${value.substring(1)}`.replaceAll("-", " ");
};
