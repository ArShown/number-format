import numberToInteger from './number-to-integer';
import numberToDecimal from './number-to-decimal';

const decodeToObjByStr = (formatStr) => (number) => {
  const numberStr = toString(number);
  return ({
    origin: {
      number: numberStr,
      integer: numberToInteger(numberStr),
      decimal: numberToDecimal(numberStr)
    },
    /* 整數長度 */
    integerLength: 0,
    /* 小數點位數 */
    decimalLength: 0,
    /* r 四捨五入 */
    isRound: false,
    /* c 逗號 */
    isComma: false
  });
};

export default decodeToObjByStr;