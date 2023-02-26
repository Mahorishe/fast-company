export const renderPhrase = (number) => {
    if (number === 1) return `${number} человек тусанёт`;
    if (number >= 11 && number <= 14) return `${number} человек тусанут`;
    const remainderNumber = number % 10;
    if (remainderNumber >= 2 && remainderNumber <= 4) {
        return `${number} человека тусанёт`;
    }

    return `${number} человек тусанут`;
};
