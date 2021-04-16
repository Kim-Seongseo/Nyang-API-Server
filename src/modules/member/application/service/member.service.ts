import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { MemberCreateReqDto } from 'src/modules/member/application/dto/member-signIn.dto';
import { MemberRepository } from 'src/modules/member/infrastructure/repository/member.repository';
import { MemberReadResDto } from 'src/modules/member/application/dto/member-read.dto';
import { classToPlain, plainToClass } from 'class-transformer';
import { RecordState } from 'src/modules/post/domain/entity/record-state.enum';
import { MemberUpdateReqDto } from 'src/modules/member/application/dto/member-update.dto';
import {
  LoginReqDto,
  LoginResDto,
} from 'src/modules/auth/application/dto/login.dto';
import { DuplicatedAccountException } from '../exception/duplicated-account.exception';
import { uuid } from 'uuidv4';
import {
  MemberFindAccountReqDto,
  MemberFindAccountResDto,
} from '../dto/member-find-account.dto';
import { MemberFindPasswordReqDto } from '../dto/member-find-password.dto';
import { MailService } from 'src/modules/mail/application/service/mail.service';
import { CertificationCodeService } from 'src/modules/certification-code/application/service/certification-code.service';
import { CertificationCodeEmailCreateReqDto } from 'src/modules/certification-code/application/dto/certification-code-email-create.dto';
import { MailSendCertificationCodeReqDto } from 'src/modules/mail/application/dto/mail-send-certification-code.dto';
import { MemberModifyPasswordReqDto } from '../dto/member-update-password.dto';
import { UnexpectedErrorException } from 'src/modules/common/application/exception/unexpected-error-exception';
import { Member } from '../../domain/entity/member.entity';

@Injectable()
export class MemberService {
  constructor(
    private memberRepository: MemberRepository,
    private readonly mailService: MailService,
    private readonly certificationCodeService: CertificationCodeService,
  ) {}

  async read(account: string): Promise<MemberReadResDto | undefined> {
    try {
      return await this.memberRepository
        .findOne({ account: account })
        .then((member) => plainToClass(MemberReadResDto, classToPlain(member))); // entity to dto
    } catch (error) {
      throw new UnexpectedErrorException();
    }
  }

  async create(
    memberCreateReqDto: MemberCreateReqDto,
  ): Promise<number | undefined> {
    await this.checkDuplication(memberCreateReqDto.account);

    const member = await this.memberRepository.create({
      ...memberCreateReqDto,
      password: await Member.encryptToHash(memberCreateReqDto.password),
    });
    await this.memberRepository.save(member);
    return member.identifier;
  }

  async delete(account: string): Promise<any | undefined> {
    let alternate = uuid();
    alternate = alternate.slice(-20, alternate.length);
    try {
      await this.memberRepository.update(
        { account: account },
        { account: alternate, isDeleted: RecordState.DELETED },
      );
      return { message: 'account is successfully deleted.' };
    } catch (error) {
      throw new UnexpectedErrorException();
    }
  }

  async update(
    account: string,
    memberUpdateReqDto: MemberUpdateReqDto,
  ): Promise<any | undefined> {
    await this.checkDuplication(account);
    try {
      await this.memberRepository.update(
        { account: account },
        { ...memberUpdateReqDto },
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
    const cryptogram = await Member.encryptToHash(result.password);
    if (!result.comparePassword(cryptogram)) return null;
    return plainToClass(LoginResDto, classToPlain(result));
  }

  async checkDuplication(account: string): Promise<void | undefined> {
    const result = await this.memberRepository.find({
      account: account,
    });
    if (result.length > 0) throw new DuplicatedAccountException();
  }

  async findAccount(
    memberFindReqDto: MemberFindAccountReqDto,
  ): Promise<MemberFindAccountResDto | undefined> {
    const result = await this.memberRepository.find({
      email: memberFindReqDto.email,
      name: memberFindReqDto.name,
      isDeleted: RecordState.NONE,
    });

    if (result.length == 0) throw new NotFoundException();
    return plainToClass(MemberFindAccountResDto, classToPlain(result));
  }

  async findPassword(
    memberFindPasswordReqDto: MemberFindPasswordReqDto,
  ): Promise<number | undefined> {
    const result = await this.memberRepository.findOne({
      account: memberFindPasswordReqDto.account,
      email: memberFindPasswordReqDto.email,
      name: memberFindPasswordReqDto.name,
    });
    if (!result) throw new NotFoundException();
    await this.sendCertificationCode(memberFindPasswordReqDto.email);
    return result.identifier;
  }

  async sendCertificationCode(email: string): Promise<void | undefined> {
    let certification_code = uuid();
    certification_code = certification_code.slice(
      -20,
      certification_code.length,
    );

    /*for certification_code*/
    await this.certificationCodeService.insert(
      plainToClass(CertificationCodeEmailCreateReqDto, {
        contact_info: email,
        certification_code,
      }),
    );

    /*for mail*/
    const mailSendCertificationCodeReqDto = plainToClass(
      MailSendCertificationCodeReqDto,
      {
        email: email,
        certification_code,
      },
    );
    return this.mailService.sendMail(mailSendCertificationCodeReqDto);
  }

  async modifyPassword(
    memberModifyPasswordReqDto: MemberModifyPasswordReqDto,
  ): Promise<number | undefined> {
    try {
      const member = await this.memberRepository.findOne({
        account: memberModifyPasswordReqDto.account,
      });
      member.password = await Member.encryptToHash(
        memberModifyPasswordReqDto.password,
      );
      await this.memberRepository.save(member);
      return member.identifier;
    } catch (error) {
      throw new UnexpectedErrorException();
    }
  }
}
