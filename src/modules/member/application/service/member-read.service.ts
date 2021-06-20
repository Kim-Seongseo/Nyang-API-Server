import { Inject, Injectable } from '@nestjs/common';
import { classToPlain, plainToClass } from 'class-transformer';
import { NotExistException } from 'src/modules/answer/application/exception/not-exist.exception';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { Member } from '../../domain/entity/member.entity';
import { MemberPort, MEMBER_PORT } from '../../domain/port/member.port';
import { MemberReadResDto } from '../dto/member-read.dto';

@Injectable()
export class MemberReadService {
  constructor(@Inject(MEMBER_PORT) private readonly memberPort: MemberPort) {}

  async read(identifier: number): Promise<MemberReadResDto | undefined> {
    const member: MemberReadResDto = await this.memberPort.findMemberByIdentifier(
      identifier,
    );
    if (!member) {
      throw new NotExistException();
    }

    return member;
  }
}
