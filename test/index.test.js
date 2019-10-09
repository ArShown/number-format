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

  describe('c: 逗號', () => {
    it("(123456.789, '0c') => '123,456'", () => {
      expect(number_format(123456.789, '0c')).to.be.eql('123,456');
    });
    it("(123456.789, '7c') => '0,123,456'", () => {
      expect(number_format(123456.789, '7c')).to.be.eql('0,123,456');
    });
    it("(123456.789, '-4.2c') => '3,456.78'", () => {
      expect(number_format(123456.789, '-4.2c')).to.be.eql('3,456.78');
    });
    it("(123456.789, '.4c') => '.78'", () => {
      expect(number_format(123456.789, '.4c')).to.be.eql('.7890');
    });
    it("(-1000.789, '0c') => '-1,000'", () => {
      expect(number_format(-1000.789, '0c')).to.be.eql('-1,000');
    });
    it("(-123456.789, '-4c') => '-1,000'", () => {
      expect(number_format(-123456.789, '-4c')).to.be.eql('3,456');
    });
  });

  describe('建構式方式', () => {
    let number;
    before(() => {
      number = new number_format(123456.789, '0');
    });
    it("取得結果", () => {
      expect(number.value()).to.be.eql('123456');
    });
    it("變更格式： 0.4", () => {
      expect(number.format('0.4')).to.be.eql('123456.7890');
    });
    it("變更格式： 4c.2", () => {
      expect(number.format('4c.2')).to.be.eql('123,456.78');
      expect(number.format('c4.2')).to.be.eql('123,456.78');
      expect(number.format('4.2c')).to.be.eql('123,456.78');
    });
  });
});
