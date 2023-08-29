import { validateBelPhoneNumber } from './phoneValidator';
import * as E from 'fp-ts/Either';

  it('should return a valid phone number when input is correct (9 digits)', () => {
    const result = validateBelPhoneNumber('299999999');
    expect(E.isRight(result)).toBe(true);
    expect(result).toEqual(E.right('+375299999999'));
  });

  it('should return a valid phone number when input is correct (12 digits)', () => {
    const result = validateBelPhoneNumber('375299999999');
    expect(E.isRight(result)).toBe(true);
    expect(result).toEqual(E.right('+375299999999'));
  });

  it('should return an error when the phone number is invalid', () => {
    const result = validateBelPhoneNumber('123456789');
    expect(E.isLeft(result)).toBe(true);
    expect(result).toEqual(
      E.left({
        type: 'phoneValidationError',
        err: 'Введите валидный номер телефона в формате +375 xx xxx xx xx',
      })
    );
  });

  it('should return an error when the phone number has incorrect length', () => {
    const result = validateBelPhoneNumber('29999999');
    expect(E.isLeft(result)).toBe(true);
    expect(result).toEqual(
      E.left({
        type: 'phoneValidationError',
        err: 'Введите валидный номер телефона в формате +375 xx xxx xx xx',
      })
    );
  });

  it('should return an error when the phone number has non-numeric characters', () => {
    const result = validateBelPhoneNumber('29a999999');
    expect(E.isLeft(result)).toBe(true);
    expect(result).toEqual(
      E.left({
        type: 'phoneValidationError',
        err: 'Введите валидный номер телефона в формате +375 xx xxx xx xx',
      })
    );
  });
