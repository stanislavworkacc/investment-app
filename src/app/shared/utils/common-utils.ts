export const isQueryParamNumber = (value: string): number => {
  const isNumber = Number(value);
  return isNumber || isNumber === 0 ? isNumber : -1;
}
