import { pipe, forEachObjIndexed, replace, keys } from 'ramda';
import matchGroup from './match-group';
import combineToResult from './combine-to-result';
import decodeToObjByStr from './decode-to-obj-by-str';

/* 這個資料夾的精華 */
const utilHandler = (formatStr, number) => {
  /* 取得群組化的結果 */
  let { origin, ...args } = matchGroup(formatStr);

  /* 解析文字結構，轉換數值 */
  const combineHandler = newFormatStr => pipe(
    decodeToObjByStr(newFormatStr),
    combineToResult
  )(number);

  /* 有群組的處理 */
  if (keys(args).length > 0) {
    forEachObjIndexed((value, key) => {
      origin = replace(key, utilHandler(value, number), origin);
    }, args);
    return origin;
  }

  /* 沒有群組就直接處理 */
  return combineHandler(formatStr);
};

export default utilHandler;