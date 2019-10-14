import { expect } from 'chai';
import outputConversion from '../../source/utils/output-conversion';

describe('outputConversion', () => {
  it('解析中括號，轉換輸出格式', () => {
    expect(outputConversion('[Ans: ]0.12')).to.be.eql({
      outputTxt: 'Ans: **$REPLACE_RESULT$**',
      filterStr: '0.12'
    });
    expect(outputConversion('[[123]]123')).to.be.eql({
      outputTxt: '[123]**$REPLACE_RESULT$**',
      filterStr: '123'
    });
    expect(outputConversion('[12]3[1]23')).to.be.eql({
      outputTxt: '12**$REPLACE_RESULT$**1',
      filterStr: '323'
    });
    expect(outputConversion('[NT]1000[$]')).to.be.eql({
      outputTxt: 'NT**$REPLACE_RESULT$**$',
      filterStr: '1000'
    });
    expect(outputConversion('1000[$]')).to.be.eql({
      outputTxt: '**$REPLACE_RESULT$**$',
      filterStr: '1000'
    });
  });

  it('錯誤處理', () => {
    expect(outputConversion, '12]31]23').to.throw();
    expect(outputConversion, '[12[]]3][1]23').to.throw();
    expect(outputConversion, ']aaa[0k').to.throw();
    expect(outputConversion, 'aa]a[d').to.throw();
    expect(outputConversion, '[[[aaa]').to.throw();
    expect(outputConversion, '[[[aaa]]]]]').to.throw();
    expect(outputConversion, '[aaa[bbb[ccc]]ddd]eee]').to.throw();
  });
});
