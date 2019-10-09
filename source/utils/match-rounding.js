import { match } from 'ramda';

/**
 * 解析是不是要四捨五入
 * @param {string} formatStr
 * @return {boolean}
 */
const matchRounding = formatStr => match(/r/)(formatStr).length > 0;

export default matchRounding;
