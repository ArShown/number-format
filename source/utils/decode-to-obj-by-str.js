import { toString } from 'ramda';
import numberToInteger from './number-to-integer';
import numberToDecimal from './number-to-decimal';
import matchDecimalLength from './match-decimal-length';
import matchIntegerLength from './match-integer-length';
import matchRounding from './match-rounding';
import matchComma from './match-comma';
import outputConversion from './output-conversion';
import { getUnit } from './transfer-unit';

/* 把formatStr解析成要轉換的格式條件 */
const decodeToObjByStr = formatStr => number => {
  const numberStr = toString(Math.abs(number));
  const origin = {
    number: numberStr,
    sign: number >= 0 ? '' : '-',
    integer: numberToInteger(numberStr),
    decimal: numberToDecimal(numberStr)
  };
  /* 處理中括號 */
  const { outputTxt, filterStr } = outputConversion(formatStr);

  return {
    origin,
    /* 單位：unitConstant｜null */
    unit: getUnit(filterStr),
    /* 整數位數 */
    integerLength: matchIntegerLength(filterStr),
    /* 小數點位數 */
    decimalLength: matchDecimalLength(filterStr),
    /* r 四捨五入 */
    isRound: matchRounding(filterStr),
    /* c 逗號 */
    isComma: matchComma(filterStr),
    /* 輸出格式 */
    outputTxt
  };
};

export default decodeToObjByStr;
