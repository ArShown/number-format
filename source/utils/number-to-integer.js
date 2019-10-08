import { pipe, ifElse, always, toString } from 'ramda';

const numberToInteger = pipe(parseInt, ifElse(isNaN, always(''), toString));

export default numberToInteger;