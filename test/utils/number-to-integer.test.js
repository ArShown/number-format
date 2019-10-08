import { expect } from 'chai';
import numberToInteger from '../../source/utils/number-to-integer';

describe('numberToInteger', () => {
  it('解析傳入值，取整數', () => {
    expect(numberToInteger('5.2')).to.be.equal('5');
    expect(numberToInteger('50.23')).to.be.equal('50');
    expect(numberToInteger('+100.005')).to.be.equal('100');
    expect(numberToInteger('-100.005')).to.be.equal('-100');
  });

  it('例外處理', () => {
    expect(numberToInteger('a')).to.be.equal('');
    expect(numberToInteger(undefined)).to.be.equal('');
    expect(numberToInteger(null)).to.be.equal('');
    expect(numberToInteger('abc.edf')).to.be.equal('');
  });
});
