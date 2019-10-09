import { pipe, split, head, match, defaultTo, isEmpty } from 'ramda';

const matchIntegerLength = formatStr => {
  const matchInteger = pipe(
    split('.'),
    head,
    match(/\-?\d+/g),
    head,
    defaultTo('')
  )(formatStr);
  return isEmpty(matchInteger) ? Infinity : parseInt(matchInteger, 10);
};

export default matchIntegerLength;
