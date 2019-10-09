import { match } from 'ramda';

/**
 * 解析是不是要加逗號
 * @param {string} formatStr
 * @return {boolean}
 */
const matchComma = formatStr => match(/c/)(formatStr).length > 0;

export default matchComma;
