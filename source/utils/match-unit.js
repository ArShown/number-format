import { match } from 'ramda';

/**
 * 解析單位: 千
 * @param {string} formatStr
 * @return {boolean}
 */
export const matchUnitThousand = formatStr => match(/k/)(formatStr).length > 0;

/**
 * 解析單位: 百萬
 * @param {string} formatStr
 * @return {boolean}
 */
export const matchUnitMillion = formatStr => match(/m/)(formatStr).length > 0;

/**
 * 解析單位: 十億
 * @param {string} formatStr
 * @return {boolean}
 */
export const matchUnitBillion = formatStr => match(/b/)(formatStr).length > 0;

/**
 * 解析單位: A
 * @param {string} formatStr
 * @return {boolean}
 */
export const matchUnitFullAll = formatStr => match(/A/)(formatStr).length > 0;

/**
 * 解析單位: a
 * @param {string} formatStr
 * @return {boolean}
 */
export const matchUnitAll = formatStr => match(/a/)(formatStr).length > 0;
