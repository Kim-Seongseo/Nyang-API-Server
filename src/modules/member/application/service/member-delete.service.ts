import { Injectable } from '@nestjs/common';
import { MemberRepository } from '../../infrastructure/repository/member.repository';
import { uuid } from 'uuidv4';
import { UnexpectedErrorException } from 'src/modules/common/application/exception/unexpected-error-exception';
import { RecordState } from 'src/modules/post/domain/entity/record-state.enum';

@Injectable()
export class MemberDeleteService {
  constructor(private memberRepository: MemberRepository) {}

  async delete(identifier: number): Promise<number | undefined> {
    let alternate = uuid();
    alternate = alternate.slice(-20, alternate.length);
    try {
      await this.memberRepository.update(
        { identifier },
        { account: alternate, isDeleted: RecordState.DELETED },
      );
      return identifier;
    } catch (error) {
      throw new UnexpectedErrorException();
    }
  }
}
