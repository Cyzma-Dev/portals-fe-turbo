export default function InputFieldFormatterHooks() {
  const normalizeInput = (value: any) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (cvLength < 4) return currentValue;
    if (cvLength < 7) return `(${currentValue.slice(0, 3)})${currentValue.slice(3)}`;
    return `(${currentValue.slice(0, 3)})${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
  };

  const onlyDigitValidation = (value: any) => {
    // Remove all non-digit characters
    const currentValue = value.replace(/\D/g, '');
    // Remove leading zeros
    return currentValue.replace(/^0+/, '');
  };

  const normalizeInputNumberDecimal = (value: any) => {
    if (!value) return value;
  
    // Remove all non-digit and non-decimal point characters
    let currentValue = value.replace(/[^\d.]/g, '');
  
    // Ensure there is only one decimal point
    const parts = currentValue.split('.');
    if (parts.length > 2) {
      currentValue = parts[0] + '.' + parts.slice(1).join('');
    }
  
    return currentValue;
  };

  const npiFormatter = (value: any) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/);
    return currentValue;
  };

  return {
    normalizeInput,
    normalizeInputNumberDecimal,
    npiFormatter,
    onlyDigitValidation,
  };
}
