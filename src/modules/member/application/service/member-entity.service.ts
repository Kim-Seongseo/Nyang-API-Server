import { Inject, Injectable } from '@nestjs/common';
import { Member } from '../../domain/entity/member.entity';
import { MemberPort, MEMBER_PORT } from '../../domain/port/member.port';

@Injectable()
export class MemberEntityService {
  constructor(@Inject(MEMBER_PORT) private readonly memberPort: MemberPort) {}

  async getEntity(account: string): Promise<Member | undefined> {
    return await this.memberPort.findMemberByAccount(account);
  }
}
