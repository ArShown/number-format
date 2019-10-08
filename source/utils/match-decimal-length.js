import { curry, pipe, match, ifElse, isNil, slice, head, always } from 'ramda';

const matchDecimalLength = formatStr => {
  const matchDecimal = pipe(match(/\.\d+/g), head)(formatStr);
  if (isNil(matchDecimal))
    return 0;

  const result = ~~slice(1, Infinity, matchDecimal);

  return (result === 0) ? Infinity : result;
};

export default matchDecimalLength;