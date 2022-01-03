export const isQueryParamNumber = (value: number | string | null | undefined): number => {
  const isNumber = Number(value);
  return isNumber || isNumber === 0 ? isNumber : -1;
}
