import { expect } from 'chai';
import matchUnitThousand from '../../source/utils/match-unit-thousand';

describe('matchUnitThousand', () => {
  it('解析單位：千', () => {
    expect(matchUnitThousand('2k')).to.be.true;
    expect(matchUnitThousand('0.5k')).to.be.true;
    expect(matchUnitThousand('2kkk')).to.be.true;
    expect(matchUnitThousand('0')).to.be.false;
    expect(matchUnitThousand('3.2')).to.be.false;
    expect(matchUnitThousand('k3.2')).to.be.true;
  });
});
