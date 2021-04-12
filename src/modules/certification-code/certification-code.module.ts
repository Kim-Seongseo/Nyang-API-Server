import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificationCodeService } from './application/service/certification-code.service';
import { CertificationCode } from './domain/entity/certification-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CertificationCode])],
  providers: [CertificationCodeService],
  exports: [CertificationCodeService],
})
export class CertificationCodeModule {}
