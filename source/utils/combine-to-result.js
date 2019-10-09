import { join, slice, takeLast } from 'ramda';
import paddingRight from './padding-right';
import paddingLeft from './padding-left';

const combineToResult = formatObject => {
  const {
    origin: { number, integer, decimal },
    /* 整數位數 */
    integerLength,
    /* 小數點位數 */
    decimalLength,
    /* r 四捨五入 */
    isRound,
    /* c 逗號 */
    isComma
  } = formatObject;

  /* 處理整數 */
  const compileInteger =
    /* 空字串回傳空 */
    integerLength === Infinity
      ? ''
      : /* 處理正負數 */
      integerLength >= 0
      ? /* 處理補零 */
        integerLength < integer.length
        ? integer
        : paddingLeft(integerLength, integer)
      : takeLast(Math.abs(integerLength), integer);

  /* 處理小數點後數字 */
  const compileDecimal =
    decimalLength === Infinity
      ? decimal
      : decimalLength < decimal.length
      ? slice(0, decimalLength, decimal)
      : paddingRight(decimalLength, decimal);

  return join('', [
    /* 處理整數 */
    compileInteger,
    /* 小數點 */
    ...(compileDecimal !== '' ? ['.'] : []),
    /* 處理小數點後數字 */
    compileDecimal
  ]);
};

export default combineToResult;
