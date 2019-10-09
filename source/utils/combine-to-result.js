import { join, slice, takeLast } from 'ramda';
import numberToInteger from './number-to-integer';
import numberToDecimal from './number-to-decimal';
import paddingRight from './padding-right';
import paddingLeft from './padding-left';
import commaString from './comma-string';

const combineToResult = formatObject => {
  let {
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

  /* 處理四捨五入 */
  if (isRound) {
    if (decimalLength > 0) {
      let size = Math.pow(10, decimalLength);
      number = Math.round(number * size) / size;
      integer = numberToInteger('' + number);
      decimal = numberToDecimal('' + number);
    } else if (decimalLength === 0) {
      integer = '' + Math.round(number);
    }
  }

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
    isComma ? commaString(compileInteger) : compileInteger,
    /* 小數點 */
    compileDecimal !== '' ? '.' + compileDecimal : ''
  ]);
};

export default combineToResult;
