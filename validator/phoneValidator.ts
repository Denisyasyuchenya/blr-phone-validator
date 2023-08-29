import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';

function validateBelPhoneNumber(
    phoneNumber: string,
  ): E.Either<{ type: 'phoneValidationError'; err: string }, string> {
    return pipe(
      phoneNumber,
      (pn) => pn.replace(/\D/g, ''),
      (cleanedNumber) => ({
        cleanedNumber,
        length: cleanedNumber.length,
        operatorCode: cleanedNumber.slice(0, 5),
      }),
      O.fromPredicate(
        ({ length, operatorCode }) =>
          (length === 9 && /^(29|33|44)/.test(operatorCode.slice(0, 2))) ||
          (length === 12 && /^(37529|37533|37544)/.test(operatorCode)),
      ),
      O.map(({ cleanedNumber }) =>
        cleanedNumber.length === 9
          ? `+375${cleanedNumber}`
          : `+${cleanedNumber}`,
      ),
      O.fold(
        () =>
          E.left({
            type: 'phoneValidationError' as const,
            err: 'Введите валидный номер телефона в формате +375 xx xxx xx xx',
          }),
        (number) => E.right(number),
      ),
    );
  }


