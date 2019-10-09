import { expect } from 'chai';
import number_format from '../source/index';

describe('number_format', () => {
  describe('整數', () => {
    it("0 就是不處理 (123456.789, '0') => '123456'", () => {
      expect(number_format(123456.789, '0')).to.be.eql('123456');
    });
    it("不足位補零 (123456.789, '3') => '123456'", () => {
      expect(number_format(123456.789, '3')).to.be.eql('123456');
    });
    it("不足位補零 (123456.789, '7') => '0123456'", () => {
      expect(number_format(123456.789, '7')).to.be.eql('0123456');
    });
    it("取後面三碼 (123456.789, '-3') => '123456'", () => {
      expect(number_format(123456.789, '-3')).to.be.eql('456');
    });
    it("空字串回傳空 (123456.789, '') => ''", () => {
      expect(number_format(123456.789, '')).to.be.eql('');
    });
  });
  describe('小數', () => {
    it("(123456.789, '.0') => '.789'", () => {
      expect(number_format(123456.789, '.0')).to.be.eql('.789');
    });
    it("(123456.789, '.2') => '.78'", () => {
      expect(number_format(123456.789, '.2')).to.be.eql('.78');
    });
    it("(123456.789, '.4') => '.7890'", () => {
      expect(number_format(123456.789, '.4')).to.be.eql('.7890');
    });
    it("(123.456, '2.2') => '123.45'", () => {
      expect(number_format(123.456, '2.2')).to.be.eql('123.45');
    });
    it("(123.456, '4.4') => '0123.4560'", () => {
      expect(number_format(123.456, '4.4')).to.be.eql('0123.4560');
    });
  });

  describe('建構式方式', () => {
    it("(123456.789, '0') => '123456'", () => {
      const number = new number_format(123456.789, '0');
      expect(number.value()).to.be.eql('123456');
      expect(number.format('0.4')).to.be.eql('123456.7890');
    });
  });
});
