import { expect } from 'chai';
import matchGroup from '../../source/utils/match-group';

describe('matchGroup', () => {
  it('解析群組', () => {
    expect(matchGroup('(1)(2)(3)')).to.be.eql([
      '1', '2', '3'
    ]);
    expect(matchGroup('(abc)aa(def)bb(ghi)')).to.be.eql([
      'abc', 'def', 'ghi'
    ]);
  });
});
