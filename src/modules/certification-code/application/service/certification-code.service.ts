import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CertificationCodeRepository } from 'src/modules/certification-code/infrastructure/repository/certification-code.repository';
import { CertificationCode } from '../../domain/entity/certification-code.entity';
import { CertificationCodeEmailCreateReqDto } from '../dto/certification-code-email-create.dto';
import {
  CertificationCodeEmailFindReqDto,
} from '../dto/certification-code-email-find.dto';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class CertificationCodeService {
  constructor(
    private certificationCodeRepository: CertificationCodeRepository,
  ) {}

  @Transactional()
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
    if (!certificationCode) {
      console.log('sibal');
      throw new HttpException('Invalid Information', HttpStatus.BAD_REQUEST);
    }
    const currentTime = new Date();
    return await certificationCode.checkValid(currentTime);
  }
}
