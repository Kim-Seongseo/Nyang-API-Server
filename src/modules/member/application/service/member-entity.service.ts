import { Inject, Injectable } from '@nestjs/common';
import { Member } from '../../domain/entity/member.entity';
import { MemberPort, MEMBER_PORT } from '../../domain/port/member.port';
import { NotExistException } from '../exception/not-exist.exception';

@Injectable()
export class MemberEntityService {
  constructor(@Inject(MEMBER_PORT) private readonly memberPort: MemberPort) {}

  async getEntity(account: string): Promise<Member | undefined> {
    const member: Member = await this.memberPort.findMemberByAccount(account);
    if (!member) {
      throw new NotExistException();
    }

    return member;
  }
}
