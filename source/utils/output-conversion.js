import {
  split,
  addIndex,
  init,
  append,
  forEach,
  isEmpty,
  slice,
  contains
} from 'ramda';

/* 取代放入結果的字串 */
export const REPLACE_RESULT = '**$REPLACE_RESULT$**';

/**
 * outputConversion
 * @desc 過濾中括號，回傳過濾的字串與最後的格式
 * @param {string} formatStr 欲解析格式字串
 * @return {{outputTxt:string, filterStr:string}}
 */
const outputConversion = formatStr => {
  /* 初始化 */
  let group = [],
    leftBrackets = [],
    rightBrackets = [],
    slitFormatStr = split('', formatStr);

  /* 統計字元 */
  addIndex(forEach)((str, idx) => {
    switch (str) {
      case '[':
        leftBrackets = append(idx, leftBrackets);
        break;
      case ']':
        if (leftBrackets.length === 0) throw '格式錯誤';
        if (leftBrackets.length === rightBrackets.length + 1)
          rightBrackets = append(idx, rightBrackets);
        else leftBrackets = init(leftBrackets);
        break;
    }
  }, slitFormatStr);

  /* 例外處理 */
  if (leftBrackets.length !== rightBrackets.length) throw '格式錯誤';

  /* 輸出處理 */
  if (isEmpty(leftBrackets) || isEmpty(rightBrackets))
    return {
      outputTxt: null,
      filterStr: formatStr
    };

  let outputTxt = '',
    startIndex = 0,
    filterStr = '';
  for (let i = 0; i < leftBrackets.length; i++) {
    if (startIndex < leftBrackets[i]) {
      if (!contains(REPLACE_RESULT, outputTxt))
        outputTxt = outputTxt + REPLACE_RESULT;
      filterStr = filterStr + slice(startIndex, leftBrackets[i], formatStr);
    }
    outputTxt =
      outputTxt + slice(leftBrackets[i] + 1, rightBrackets[i], formatStr);
    startIndex = rightBrackets[i] + 1;
  }

  if (startIndex < formatStr.length) {
    if (!contains(REPLACE_RESULT, outputTxt))
      outputTxt = outputTxt + REPLACE_RESULT;
    filterStr = filterStr + slice(startIndex, formatStr.length, formatStr);
  }

  return {
    outputTxt,
    filterStr
  };
};

export default outputConversion;
