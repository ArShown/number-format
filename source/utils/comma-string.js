/**
 * 參考來源
 * https://blog.csdn.net/sushauai/article/details/52958162
 */
import { dropLast, takeLast } from 'ramda';

const commaString = numberStr => {
  if (!numberStr) return numberStr;

  let result = '';
  while (numberStr.length > 3) {
    /* 先取後面三位，加逗號 */
    result = ',' + takeLast(3, numberStr) + result;
    /* 更新：去掉後面三位 */
    numberStr = dropLast(3, numberStr);
  }
  return numberStr + result;
};

export default commaString;