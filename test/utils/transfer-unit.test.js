import { expect } from 'chai';
import { getUnit, computeUnit } from '../../source/utils/transfer-unit';

describe('transfer-unit', () => {
  describe('#getUnit', () => {
    it('取得定義的單位', () => {
      expect(getUnit('123k')).to.be.equal('k');
      expect(getUnit('k123')).to.be.equal('k');
      expect(getUnit('lll')).to.be.null;
    });
    it('單位順序: A > a > k > m > b', () => {
      expect(getUnit('123k')).to.be.equal('k');
      expect(getUnit('mg149')).to.be.equal('m');
      expect(getUnit('100km')).to.be.equal('k');
      expect(getUnit('100bmk')).to.be.equal('k');
      expect(getUnit('100bmka')).to.be.equal('a');
    });
    it('無定義單位', () => {
      expect(getUnit('lll')).to.be.null;
      expect(getUnit('123')).to.be.null;
      expect(getUnit('0.0')).to.be.null;
      expect(getUnit('0.0rc')).to.be.null;
    });
  });

  describe('#computeUnit', () => {
    it('計算: thousand 回傳 [integer, decimal]', () => {
      expect(computeUnit('k','123456')).to.be.eql([
        '123',
        '456'
      ]);
      expect(computeUnit('k','123456.789')).to.be.eql([
        '123',
        '456789'
      ]);
      expect(computeUnit('k','123')).to.be.eql([
        '0',
        '123'
      ]);
      expect(computeUnit('k','10')).to.be.eql([
        '0',
        '01'
      ]);
    });
  });
});
