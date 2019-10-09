import { pipe, split, head, isEmpty } from 'ramda';

const matchIntegerLength = formatStr => {
  const matchInteger = pipe(
    split('.'),
    head
  )(formatStr);
  return isEmpty(matchInteger) ? Infinity : parseInt(matchInteger, 10);
};

export default matchIntegerLength;
