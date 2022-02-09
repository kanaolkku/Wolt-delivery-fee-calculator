const isNumeric = (val: string): boolean => {
  return /^\d*\.?\d*$/.test(val);
};

const validateNumbers = (numbers: Array<string>): boolean => {
  let isValid: boolean = true;
  numbers.forEach((number) => {
    if (!isNumeric(number) || !number) {
      isValid = false;
    }
  });
  return isValid;
};

export { isNumeric, validateNumbers };
