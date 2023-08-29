import * as readline from 'readline';
import { validateBelPhoneNumber } from './phoneValidator'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Введите номер телефона: ', (input) => {
  const result = validateBelPhoneNumber(input);

  if (result._tag === 'Left') {
    console.log(`Ошибка: ${result.left.err}`);
  } else {
    console.log(`Валидный номер: ${result.right}`);
  }

  rl.close();
});
