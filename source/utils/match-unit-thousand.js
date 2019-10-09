import { match } from 'ramda';

/**
 * 解析單位: 千
 * @param {string} formatStr
 * @return {boolean}
 */
const matchUnitThousand = formatStr => match(/k/)(formatStr).length > 0;

export default matchUnitThousand;
