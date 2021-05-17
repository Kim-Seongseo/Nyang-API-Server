import { RecordState } from 'src/modules/post/domain/entity/record-state.enum';
import {
  MemberFindAccountReqDto,
  MemberFindAccountResDto,
} from '../../application/dto/member-find-account.dto';
import { MemberCreateReqDto } from '../../application/dto/member-signIn.dto';
import { MemberUpdateReqDto } from '../../application/dto/member-update.dto';
import { Member } from '../entity/member.entity';

export const MEMBER_PORT = 'MEMBER_PORT';

export interface MemberPort {
  countMemberByAccount(account: string): Promise<number | undefined>;
  findMemberByAccount(account: string): Promise<Member | undefined>;
  createMember(
    memberCreateReqDto: MemberCreateReqDto,
    encryptedPassword: string,
  ): Promise<Member | undefined>;
  deleteMember(
    identifier: number,
    alternate: string,
    isDeleted: RecordState,
  ): Promise<number | undefined>;
  findAccount(
    memberFindAccountReqDto: MemberFindAccountReqDto,
  ): Promise<MemberFindAccountResDto | undefined>;
  saveMember(member: Member): Promise<number | undefined>;
  updateMember(
    identifier: number,
    memberUpdateReqDtoo: MemberUpdateReqDto,
  ): Promise<number | undefined>;
  findMemberByIdentifier(identifier: number): Promise<Member | undefined>;
}
