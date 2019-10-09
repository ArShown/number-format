import { expect } from 'chai';
import matchIntegerLength from '../../source/utils/match-integer-length';

describe('matchIntegerLength', () => {
  it('解析字串格式的整數', () => {
    expect(matchIntegerLength('0.12')).to.be.equal(0);
    expect(matchIntegerLength('3.12')).to.be.equal(3);
    expect(matchIntegerLength('7.12')).to.be.equal(7);
    expect(matchIntegerLength('-3.12')).to.be.equal(-3);
    expect(matchIntegerLength('.2')).to.be.equal(Infinity);
    expect(matchIntegerLength('')).to.be.equal(Infinity);
  });
});
