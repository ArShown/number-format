import {
  forEach,
  addIndex,
  split,
  append,
  slice,
  findLastIndex,
  findIndex,
  tail,
  head,
  remove,
  last,
  defaultTo,
  init,
  reduce,
  join,
  includes
} from 'ramda';

/**
 * 取得所在群組
 * @private
 * @param {Array<[number,number]>} group 群組序列號
 * @param {number} idx 序列號
 * @return {number} group的序列號：-1 表示不在任何群組中
 */
const _inGroupIndex = group => idx => findIndex(([startIdx, endIdx]) => idx >= startIdx && idx <= endIdx)(group);

const matchGroup = formatStr => {
  /* 初始化 */
  let group = [],
    leftBrackets = [],
    rightBrackets = [],
    slitFormatStr = split('', formatStr);

  /* 統計字元 */
  addIndex(forEach)((str, idx) => {
    switch (str) {
      case '(':
        leftBrackets = append(idx, leftBrackets);
        break;
      case ')':
        if (leftBrackets.length === 0) throw '格式錯誤';
        if (leftBrackets.length === rightBrackets.length + 1)
          rightBrackets = append(idx, rightBrackets);
        else leftBrackets = init(leftBrackets);
        break;
    }
  }, slitFormatStr);

  /* 例外處理 */
  if (leftBrackets.length !== rightBrackets.length) throw '格式錯誤';

  /* 包裝分類 */
  while (rightBrackets.length > 0) {
    const [_, lastRight] = defaultTo(['', -1], last(group));
    const nextRight = head(rightBrackets);
    const leftIdx = findLastIndex(idx => idx < nextRight)(leftBrackets);
    const nextLeft = leftBrackets[leftIdx];
    group = append([nextLeft, nextRight])(group);
    leftBrackets = remove(leftIdx, 1)(leftBrackets);
    rightBrackets = tail(rightBrackets);
  }

  /**
   *  組裝輸出的字串
   *  群組的部分要變成變數格式
   *  ex. aaa(bbb)ccc => aaa$1ccc
   */
  const getGroupIndex = _inGroupIndex(group);
  const origin = addIndex(reduce)((combineStr, unitStr, idx) => {
    /* 判斷字元是不是群組中 */
    const groupIdx = getGroupIndex(idx);
    if (groupIdx === -1)
      combineStr = append(unitStr, combineStr);
    else {
      /* 群組是不是已加入 */
      if (!includes(`$${groupIdx + 1}`, combineStr))
        combineStr = append(`$${groupIdx + 1}`, combineStr);
    }
    return combineStr;
  }, [], slitFormatStr);

  /* 群組字元對應表 */
  const objChild = addIndex(reduce)((obj, [startIdx, endIdx], idx) => {
    obj[`$${idx + 1}`] = slice(startIdx + 1, endIdx, formatStr);
    return obj;
  }, {}, group);

  return {
    origin: join('', origin),
    ...objChild
  };
};

export default matchGroup;
