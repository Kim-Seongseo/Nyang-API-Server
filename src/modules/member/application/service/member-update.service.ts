import { Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { MemberPort, MEMBER_PORT } from '../../domain/port/member.port';
import { MemberRepository } from '../../infrastructure/persistence/repository/member.repository';
import { MemberUpdateReqDto } from '../dto/member-update.dto';

@Injectable()
export class MemberUpdateService {
  constructor(@Inject(MEMBER_PORT) private readonly memberPort: MemberPort) {}

  async update(
    identifier: number,
    memberUpdateReqDto: MemberUpdateReqDto,
    fileIdentifier,
  ): Promise<any | undefined> {
    try {
      const memberIdentifier: number = await this.memberPort.updateMember(
        identifier,
        memberUpdateReqDto,
        fileIdentifier,
      );
      return memberIdentifier;
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException();
    }
  }
}
