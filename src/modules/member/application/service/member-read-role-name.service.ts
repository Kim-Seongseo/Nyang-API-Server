import { Inject, Injectable } from '@nestjs/common';
import { NotExistException } from 'src/modules/answer/application/exception/not-exist.exception';
import { MemberPort, MEMBER_PORT } from '../../domain/port/member.port';

@Injectable()
export class MemberReadRoleNameService {
  constructor(@Inject(MEMBER_PORT) private readonly memberPort: MemberPort) {}

  async readRoleNameByIdentifier(
    identifier: number,
  ): Promise<string | undefined> {
    const roleName: string = await this.memberPort.findRoleByIdentifier(
      identifier,
    );
    if (!roleName) {
      throw new NotExistException();
    }

    return roleName;
  }
}
