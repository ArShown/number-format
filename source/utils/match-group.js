import { map, pipe, match, drop, dropLast } from 'ramda';

const matchGroup = pipe(match(/\(.+?\)/g), map(pipe(drop(1), dropLast(1))));

export default matchGroup;