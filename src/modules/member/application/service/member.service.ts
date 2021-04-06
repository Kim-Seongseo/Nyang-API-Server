import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateMemberReqDto } from 'src/modules/member/application/dto/member-signIn.dto';
import { MemberRepository } from 'src/modules/member/infrastructure/repository/member.repository';
import { MemberReadResDto } from 'src/modules/member/application/dto/member-read.dto';
import { classToPlain, plainToClass } from 'class-transformer';
import { RecordState } from 'src/modules/common/domain/entity/record-state.enum';
import { UpdateMemberReqDto } from 'src/modules/member/application/dto/member-update.dto';
import { LoginReqDto, LoginResDto } from 'src/auth/application/dto/login.dto';
import { encryptToHash } from 'src/modules/member/application/service/encrypt-to-hash';
import { DuplicatedAccountException } from '../exception/duplicatedAccount.exception';
import { uuid } from 'uuidv4';
import { MemberFindReqDto, MemberFindResDto } from '../dto/member-find.dto';

@Injectable()
export class MemberService {
  constructor(private memberRepository: MemberRepository) {}

  async findOne(account: string): Promise<MemberReadResDto | undefined> {
    return await this.memberRepository
      .findOne({ account: account['account'] })
      .then((member) => plainToClass(MemberReadResDto, classToPlain(member))); // entity to dto
  }

  async create(
    createMemberReqDto: CreateMemberReqDto,
  ): Promise<Long | undefined> {
    await this.checkDup(createMemberReqDto.account);
    const result = await this.memberRepository.insert({
      ...createMemberReqDto,
      password: await encryptToHash(createMemberReqDto.password),
    });
    return result.identifiers['identifier'];
  }

  async delete(account: string): Promise<any | undefined> {
    let alternate = uuid();
    alternate = alternate.slice(-20, alternate.length);
    try {
      await this.memberRepository.update(
        { account: account['account'] },
        { account: alternate, isDeleted: RecordState.DELETED },
      );
      return { message: 'account is successfully deleted.' };
    } catch (error) {
      throw new RequestTimeoutException();
    }
  }

  async update(
    account: string,
    updateMemberReqDto: UpdateMemberReqDto,
  ): Promise<any | undefined> {
    await this.checkDup(account);
    try {
      await this.memberRepository.update(
        { account: account },
        { ...updateMemberReqDto },
      );
      return { message: 'account is successfully modified.' };
    } catch (error) {
      throw new RequestTimeoutException();
    }
  }

  async verify(loginReqDto: LoginReqDto): Promise<LoginResDto | undefined> {
    const result = await this.memberRepository.findOne({
      account: loginReqDto.account,
    });
    const cryptogram = await encryptToHash(result.password);
    if (!result.comparePassword(cryptogram)) return null;
    return plainToClass(LoginResDto, classToPlain(result));
  }

  async checkDup(account: string): Promise<void | undefined> {
    const result = await this.memberRepository.count({
      account: account,
    });
    if (result != 0) {
      throw new DuplicatedAccountException();
    }
  }

  async findAccount(
    memberFindReqDto: MemberFindReqDto,
  ): Promise<MemberFindResDto | undefined> {
    const result = await this.memberRepository.find({
      email: memberFindReqDto.email,
      name: memberFindReqDto.name,
      isDeleted: RecordState.NONE,
    });

    if (result.length == 0) throw new NotFoundException();
    return plainToClass(MemberFindResDto, classToPlain(result));
  }
}
