import { expect } from 'chai';
import matchGroup from '../../source/utils/match-group';

describe('matchGroup', () => {
  it('解析群組', () => {
    expect(matchGroup('(1)(2)(3)')).to.be.eql({
      origin: '$1$2$3',
      $1: '1',
      $2: '2',
      $3: '3'
    });
    expect(matchGroup('(abc)aa(def)bb(ghi)cc')).to.be.eql({
      origin: '$1aa$2bb$3cc',
      $1: 'abc',
      $2: 'def',
      $3: 'ghi'
    });
    expect(matchGroup('(aaa(bbb(ccc))ddd)eee')).to.be.eql({
      origin: '$1eee',
      $1: 'aaa(bbb(ccc))ddd'
    });
    expect(matchGroup('aaa(bbb(ccc))ddd')).to.be.eql({
      origin: 'aaa$1ddd',
      $1: 'bbb(ccc)'
    });
    expect(matchGroup('bbb(ccc)')).to.be.eql({
      origin: 'bbb$1',
      $1: 'ccc'
    });
    expect(matchGroup('aaa(ddd)bbb(c(c)c)')).to.be.eql({
      origin: 'aaa$1bbb$2',
      $1: 'ddd',
      $2: 'c(c)c'
    });

    expect(matchGroup('aaa(ddd)bbb(c(c)c)')).to.be.eql({
      origin: 'aaa$1bbb$2',
      $1: 'ddd',
      $2: 'c(c)c'
    });
  });

  it('錯誤處理', () => {
    expect(matchGroup, 'aa)a)d').to.throw();
    expect(matchGroup, 'aa)a(d').to.throw();
    expect(matchGroup, '(((aaa)').to.throw();
    expect(matchGroup, '(((aaa)))))').to.throw();
    expect(matchGroup, '(aaa(bbb(ccc))ddd)eee)').to.throw();
  });
});
