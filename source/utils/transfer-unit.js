import {
  findIndex,
  equals,
  defaultTo,
  prop,
  divide,
  split,
  contains,
  toString,
  ifElse,
  length,
  identity,
  append
} from 'ramda';
import {
  matchUnitThousand,
  matchUnitMillion,
  matchUnitBillion,
  matchUnitAll,
  matchUnitGreat
} from './match-unit';

const unitConstant = ['a', 'g', 'k', 'm', 'b'];

/**
 * 解析單位
 * @desc 如果不是 unitConstant 裡面定義的，就回傳 null
 * @param {string} formatStr
 * @return {?$Values<unitConstant>}
 */
export const getUnit = formatStr => {
  const matchIdx = findIndex(equals(true))([
    /* a */
    matchUnitAll(formatStr),
    /* g */
    matchUnitGreat(formatStr),
    /* 千 */
    matchUnitThousand(formatStr),
    /* 百萬 */
    matchUnitMillion(formatStr),
    /* 十億 */
    matchUnitBillion(formatStr)
  ]);

  return defaultTo(null, prop(matchIdx, unitConstant));
};

/**
 * 計算
 * @param {$Values<unitConstant>} unit 單位代號
 * @param {string} numberStr
 * @return {Array<number, number>} 整數跟小數
 * @example
 *   computeUnit('k', '100200') => [100,200]
 */
export const computeUnit = (unit, numberStr) => {
  switch (unit) {
    case 'k':
      return split('.', toString(divide(+numberStr, 1000)));
    case 'm':
      return split('.', toString(divide(+numberStr, 1000000)));
    case 'b':
      return split('.', toString(divide(+numberStr, 1000000000)));
    case 'g':
      if (+numberStr > 1000000000)
        return [
          ...ifElse(pipe(length, equals(2)), identity, append('0'))(computeUnit('b', numberStr)),
          'B'
        ];
      if (+numberStr > 1000000)
        return [
          ...ifElse(pipe(length, equals(2)), identity, append('0'))(computeUnit('m', numberStr)),
          'M'
        ];
      return [
        ...ifElse(pipe(length, equals(2)), identity, append('0'))(computeUnit('k', numberStr)),
        'K'
      ];
  }
};
