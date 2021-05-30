import { Inject, Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { RecordState } from 'src/modules/post/domain/entity/record-state.enum';
import { MemberPort, MEMBER_PORT } from '../../domain/port/member.port';

@Injectable()
export class MemberDeleteService {
  constructor(@Inject(MEMBER_PORT) private readonly memberPort: MemberPort) {}

  async delete(identifier: number): Promise<number | undefined> {
    let alternate = uuid();
    alternate = alternate.slice(-20, alternate.length);
    const memberIdentifier = await this.memberPort.deleteMember(
      identifier,
      alternate,
      RecordState.DELETED,
    );
    if (!memberIdentifier) {
      throw new UnexpectedErrorException();
    }

    return memberIdentifier;
  }
}
