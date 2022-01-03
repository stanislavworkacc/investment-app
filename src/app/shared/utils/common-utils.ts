export const isQueryParamNumber = (value: string): number => {
  const isNumber = Number(value);
  console.log('isNumber', isNumber)
  return isNumber || isNumber === 0 ? isNumber : -1;
}
