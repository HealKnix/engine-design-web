// const str = `I_1p = I_0п+I'_2sin(phi)`
const str = `cos(phi)'_2 = R/Z + cos(pi) - 2sin(phi)*sin(pi)/Z / 2^cos(phi)`;
console.log(str);
const regex = /[a-zA-Zа-яА-Я_'()][a-zA-Zа-яА-Я0-9_'()]*/g;
const variables = str.match(regex);
console.log(variables);

const func = variables[0];
let equals = variables.filter((_, index) => index != 0);

// const regexAfterEqual = /[a-zA-Zа-яА-Я_'][a-zA-Zа-яА-Я0-9_']*/g
// equals = equals.map(eq => eq.match(regexAfterEqual)).flat()

console.log(`Рассчитываемая переменная = ${func}`);
console.log(`Введённая переменная = ${equals.join(', ')}`);
