import { expect } from 'chai';
import matchDecimalLength from '../../source/utils/match-decimal-length';

describe('matchDecimalLength', () => {
  it('解析小數點', () => {
    expect(matchDecimalLength('0.0')).to.be.equal(Infinity);
    expect(matchDecimalLength('5.2')).to.be.equal(2);
    expect(matchDecimalLength('0.123')).to.be.equal(123);
    expect(matchDecimalLength('0.12a3')).to.be.equal(12);
    expect(matchDecimalLength('0.1.2.3')).to.be.equal(1);
    expect(matchDecimalLength('0.')).to.be.equal(0);
    expect(matchDecimalLength('0.a', '')).to.be.equal(0);
  });
});
