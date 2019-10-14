import { join, slice, takeLast, clone, replace } from 'ramda';
import numberToInteger from './number-to-integer';
import numberToDecimal from './number-to-decimal';
import paddingRight from './padding-right';
import paddingLeft from './padding-left';
import commaString from './comma-string';
import { REPLACE_RESULT } from './output-conversion';
import { computeUnit } from './transfer-unit';

const combineToResult = formatObject => {
  let {
    origin: { number, integer, decimal },
    /* 單位 */
    unit,
    /* 整數位數 */
    integerLength,
    /* 小數點位數 */
    decimalLength,
    /* r 四捨五入 */
    isRound,
    /* c 逗號 */
    isComma,
    /* 輸出格式 */
    outputTxt
  } = formatObject;

  /* 處理單位 */
  let greatUnit = '';
  if (unit !== null) {
    if (unit === 'a') {
      /* 單位如果是 a 要特別處理 */
      let numberToCount = +clone(number),
        resultBillion = '',
        resultMillion = '',
        resultThousand = '';

      // 先拿 billion
      if (numberToCount >= 1000000000) {
        const billion = computeUnit('b', '' + numberToCount);
        resultBillion =
          billion[0] !== '0'
            ? (isComma ? commaString(billion[0]) : billion[0]) + 'B '
            : '';
        numberToCount = numberToCount % 1000000000;
        /* 寫入百萬預設值 */
        resultMillion = '0M ';
      }

      if (numberToCount >= 1000000) {
        // 再拿 million
        const million = computeUnit('m', '' + numberToCount);
        resultMillion =
          million[0] === '0' && resultBillion === '' ? '' : million[0] + 'M ';
        numberToCount = numberToCount % 1000000;
      }

      // 再拿 thousand
      const thousand = computeUnit('k', '' + numberToCount);
      resultThousand = `${thousand[0]}K`;

      return join('', [resultBillion, resultMillion, resultThousand]);
    }
    /* 更新資料 */
    [integer, decimal, greatUnit = ''] = computeUnit(unit, number);
    number = `${integer}${decimal !== '' ? '.' + decimal : ''}`;
  }

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
    /* 空字串回傳空 || 最低位數為0，整數為零而且沒有小數 */
    (integerLength === Infinity || (integerLength === 0 && integer === '0' && decimalLength === 0))
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

  /* 數字解析結果 */
  const result = join('', [
    /* 處理整數 */
    isComma ? commaString(compileInteger) : compileInteger,
    /* 小數點 */
    compileDecimal !== '' ? '.' + compileDecimal : '',
    /* 單位放最後面: 如果都是空值就不顯示 */
    compileInteger === '' && compileDecimal === '' ? '' : greatUnit
  ]);

  return outputTxt ? replace(REPLACE_RESULT, result, outputTxt) : result;
};

export default combineToResult;
