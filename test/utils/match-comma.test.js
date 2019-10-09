import { expect } from 'chai';
import matchComma from '../../source/utils/match-comma';

describe('matchComma', () => {
  it('解析要不要逗號', () => {
    expect(matchComma('2c')).to.be.true;
    expect(matchComma('0.5c')).to.be.true;
    expect(matchComma('2ccc')).to.be.true;
    expect(matchComma('0')).to.be.false;
    expect(matchComma('3.2')).to.be.false;
    expect(matchComma('c3.2')).to.be.true;
  });
});
