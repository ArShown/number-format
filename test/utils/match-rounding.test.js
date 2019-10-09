import { expect } from 'chai';
import matchRounding from '../../source/utils/match-rounding';

describe('matchRounding', () => {
  it('解析要不要四捨五入', () => {
    expect(matchRounding('2r')).to.be.true;
    expect(matchRounding('0.5r')).to.be.true;
    expect(matchRounding('2r.4')).to.be.true;
    expect(matchRounding('0')).to.be.false;
    expect(matchRounding('3.2')).to.be.false;
    expect(matchRounding('r3.2')).to.be.true;
  });
});
