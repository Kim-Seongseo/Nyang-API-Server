import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Member } from '../../domain/entity/member.entity';
import { MemberPort, MEMBER_PORT } from '../../domain/port/member.port';
import { MemberFindPasswordReqDto } from '../dto/member-find-password.dto';
import { MemberSendCertificationCodeService } from './member-send-certification-code.service';

@Injectable()
export class MemberFindPasswordService {
  constructor(
    @Inject(MEMBER_PORT) private readonly memberPort: MemberPort,
    private memberSendCertificationCodeService: MemberSendCertificationCodeService,
  ) {}

  async findPassword(
    memberFindPasswordReqDto: MemberFindPasswordReqDto,
  ): Promise<number | undefined> {
    const member: Member = await this.memberPort.findMemberByAccount(
      memberFindPasswordReqDto.account,
    );
    if (!member) throw new NotFoundException();

    await this.memberSendCertificationCodeService.sendCertificationCode(
      memberFindPasswordReqDto.email,
    );
    return member.identifier;
  }
}
