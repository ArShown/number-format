import { toString } from 'ramda';
import numberToInteger from './number-to-integer';
import numberToDecimal from './number-to-decimal';
import matchDecimalLength from './match-decimal-length';
import matchIntegerLength from './match-integer-length';

/* 把formatStr解析成要轉換的格式條件 */
const decodeToObjByStr = formatStr => number => {
  const numberStr = toString(number);
  const origin = {
    number: numberStr,
    integer: numberToInteger(numberStr),
    decimal: numberToDecimal(numberStr)
  };

  return {
    origin,
    /* 整數位數 */
    integerLength: matchIntegerLength(formatStr),
    /* 小數點位數 */
    decimalLength: matchDecimalLength(formatStr),
    /* r 四捨五入 */
    isRound: false,
    /* c 逗號 */
    isComma: false
  };
};

export default decodeToObjByStr;
