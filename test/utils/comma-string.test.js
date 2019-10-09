import { expect } from 'chai';
import commaString from '../../source/utils/comma-string';

describe('commaString', () => {
  it('字串加逗號', () => {
    expect(commaString('100')).to.be.equal('100');
    expect(commaString('1000')).to.be.equal('1,000');
    expect(commaString('001000')).to.be.equal('001,000');
  });

  it('空字串輸出空字串', () => {
    expect(commaString('')).to.be.equal('');
  });
});
