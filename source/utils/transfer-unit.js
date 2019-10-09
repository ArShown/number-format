import {
  findIndex,
  equals,
  defaultTo,
  prop,
  divide,
  split,
  toString
} from 'ramda';
import {
  matchUnitThousand,
  matchUnitMillion,
  matchUnitBillion,
  matchUnitFullAll,
  matchUnitAll
} from './match-unit';

const unitConstant = ['A', 'a', 'k', 'm', 'b'];

/**
 * 解析單位
 * @desc 如果不是 unitConstant 裡面定義的，就回傳 null
 * @param {string} formatStr
 * @return {?$Values<unitConstant>}
 */
export const getUnit = formatStr => {
  const matchIdx = findIndex(equals(true))([
    /* A */
    matchUnitFullAll(formatStr),
    /* a */
    matchUnitAll(formatStr),
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
  }
};
