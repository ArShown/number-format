import { expect } from 'chai';
import paddingLeft from '../../source/utils/padding-left';

describe('paddingLeft', () => {
  it('#不足位補零', () => {
    expect(paddingLeft(0, '100')).to.be.equal('100');
    expect(paddingLeft(1, '100')).to.be.equal('100');
    expect(paddingLeft(3, '100')).to.be.equal('100');
    expect(paddingLeft(5, '100')).to.be.equal('00100');
    expect(paddingLeft(7, '')).to.be.equal('0000000');
  });

  it('例外處理', () => {
    expect(paddingLeft(-2, '100')).to.be.equal('100');
    expect(paddingLeft(-30, '100')).to.be.equal('100');
    expect(paddingLeft(-499, '100')).to.be.equal('100');
    expect(paddingLeft(-499, '')).to.be.equal('');
  });
});
