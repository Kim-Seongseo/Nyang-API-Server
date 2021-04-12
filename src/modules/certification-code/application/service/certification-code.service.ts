import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CertificationCodeRepository } from 'src/modules/certification-code/infrastructure/repository/certification-code.repository';
import { CertificationCode } from '../../domain/entity/certification-code.entity';
import { CertificationCodeEmailCreateReqDto } from '../dto/certification-code-email-create.dto';
import {
  CertificationCodeEmailFindReqDto,
  CertificationCodeEmailFindResDto,
} from '../dto/certification-code-email-find.dto';

@Injectable()
export class CertificationCodeService {
  constructor(
    private certificationCodeRepository: CertificationCodeRepository,
  ) {}

  async insert(
    certificationCodeEmailCreateReqDto: CertificationCodeEmailCreateReqDto,
  ): Promise<void | undefined> {
    try {
      this.certificationCodeRepository.insert({
        ...certificationCodeEmailCreateReqDto,
      });
    } catch (error) {
      console.log(error);
    }
  }

  private async findOne(
    certificationCodeEmailFindReqDto: CertificationCodeEmailFindReqDto,
  ): Promise<CertificationCode | undefined> {
    try {
      return await this.certificationCodeRepository.findOne({
        contact_info: certificationCodeEmailFindReqDto.contact_info,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async verify(
    certificationCodeEmailFindReqDto: CertificationCodeEmailFindReqDto,
  ): Promise<number | undefined> {
    const certificationCode = await this.findOne(
      certificationCodeEmailFindReqDto,
    );
    const currentTime = new Date();
    return certificationCode.checkValid(currentTime);
  }
}
