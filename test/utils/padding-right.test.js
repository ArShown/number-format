import { expect } from 'chai';
import paddingRight from '../../source/utils/padding-right';

describe('paddingRight', () => {
  it('不足位補零', () => {
    expect(paddingRight(0, '100')).to.be.equal('100');
    expect(paddingRight(1, '100')).to.be.equal('100');
    expect(paddingRight(3, '100')).to.be.equal('100');
    expect(paddingRight(5, '100')).to.be.equal('10000');
    expect(paddingRight(7, '')).to.be.equal('0000000');
  });

  it('例外處理', () => {
    expect(paddingRight(-2, '100')).to.be.equal('100');
    expect(paddingRight(-30, '100')).to.be.equal('100');
    expect(paddingRight(-499, '100')).to.be.equal('100');
    expect(paddingRight(-499, '')).to.be.equal('');
  });
});
