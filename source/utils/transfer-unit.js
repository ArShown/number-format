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
  append,
  pipe
} from 'ramda';
import {
  matchUnitThousand,
  matchUnitMillion,
  matchUnitBillion,
  matchUnitAll,
  matchUnitGreat
} from './match-unit';
import numberToInteger from './number-to-integer';
import numberToDecimal from './number-to-decimal';

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
 * 將結果統一格式輸出
 * @private
 * @param {Array<string,string>} result 結果
 * @param {string} unit 單位
 * @return {Array<string,string,string>} 整數跟小數還有單位
 */
const _resultCompile = (result, unit = '') => [
  ...ifElse(
    pipe(length, equals(2)),
    identity,
    append('')
  )(result),
  unit
];

/**
 * 計算
 * @param {$Values<unitConstant>} unit 單位代號
 * @param {string} numberStr
 * @return {Array<string,string,string?>} 整數跟小數還有單位
 * @example
 *   computeUnit('k', '100200') => [100,200]
 *   computeUnit('g', '100200') => [100,200,'K']
 */
export const computeUnit = (unit, numberStr) => {
  switch (unit) {
    case 'k':
      const k = toString(divide(+numberStr, 1000));
      return [
        numberToInteger(k),
        numberToDecimal(k)
      ];
    case 'm':
      const m = toString(divide(+numberStr, 1000000));
      return [
        numberToInteger(m),
        numberToDecimal(m)
      ];
    case 'b':
      const b = toString(divide(+numberStr, 1000000000));
      return [
        numberToInteger(b),
        numberToDecimal(b)
      ];
    case 'g':
      if (+numberStr > 1000000000)
        return _resultCompile(computeUnit('b', numberStr), 'B');
      if (+numberStr > 1000000)
        return _resultCompile(computeUnit('m', numberStr), 'M');
      return _resultCompile(computeUnit('k', numberStr), 'K');
  }
};
