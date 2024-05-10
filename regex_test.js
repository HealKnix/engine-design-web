// // const str = `I_1p = I_0п+I'_2sin(phi)`
// const str = `cos(phi)'_2 = R/Z + cos(pi) - 2sin(phi)*sin(pi)/Z / 2^cos(phi)`;
// console.log(str);
// const regex = /[a-zA-Zа-яА-Я_'()][a-zA-Zа-яА-Я0-9_'()]*/g;
// const variables = str.match(regex);
// console.log(variables);

// const func = variables[0];
// let equals = variables.filter((_, index) => index != 0);

// // const regexAfterEqual = /[a-zA-Zа-яА-Я_'][a-zA-Zа-яА-Я0-9_']*/g
// // equals = equals.map(eq => eq.match(regexAfterEqual)).flat()

// console.log(`Рассчитываемая переменная = ${func}`);
// console.log(`Введённая переменная = ${equals.join(', ')}`);

const phoneFormat = (s, plus = true) => {
  const startsWith = plus ? '+7' : '8';

  let phone = s.replace(/[^0-9]/g, '');
  if (phone.startsWith('7') && plus) {
    phone = phone.substr(1);
  }
  if (phone.startsWith('8')) {
    phone = phone.substr(1);
  }

  return phone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/g, `${startsWith} ($1) $2-$3-$4`);
};

console.log(phoneFormat('+79247180033'));
