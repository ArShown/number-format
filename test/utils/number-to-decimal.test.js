import { expect } from 'chai';
import numberToDecimal from '../../source/utils/number-to-decimal';

describe('numberToDecimal', () => {
  it('解析傳入值，取小數', () => {
    expect(numberToDecimal('5.2')).to.be.equal('2');
    expect(numberToDecimal('50.23')).to.be.equal('23');
    expect(numberToDecimal('50.52')).to.be.equal('52');
    expect(numberToDecimal('+100.005')).to.be.equal('005');
    expect(numberToDecimal('-100.055')).to.be.equal('055');
  });

  it('例外處理', () => {
    expect(numberToDecimal('a')).to.be.equal('');
    expect(numberToDecimal(undefined)).to.be.equal('');
    expect(numberToDecimal(null)).to.be.equal('');
    expect(numberToDecimal('abc.edf')).to.be.equal('');
  });
});
