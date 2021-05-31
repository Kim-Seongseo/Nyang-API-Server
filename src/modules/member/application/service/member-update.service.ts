import { Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { MemberPort, MEMBER_PORT } from '../../domain/port/member.port';
import { MemberUpdateReqDto } from '../dto/member-update.dto';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class MemberUpdateService {
  constructor(@Inject(MEMBER_PORT) private readonly memberPort: MemberPort) {}

  @Transactional()
  async update(
    identifier: number,
    memberUpdateReqDto: MemberUpdateReqDto,
    fileIdentifier,
  ): Promise<any | undefined> {
    const memberIdentifier: number = await this.memberPort.updateMember(
      identifier,
      memberUpdateReqDto,
      fileIdentifier,
    );
    if (!memberIdentifier) {
      throw new UnexpectedErrorException();
    }

    return memberIdentifier;
  }
}
