export const pluralForm = (number) => {
  if (number >= 11 && number <= 14) return `${number} человек`;
  const remainderNumber = number % 10;
  if (remainderNumber >= 2 && remainderNumber <= 4) return `${number} человека`;

  return `${number} человек`;
};
