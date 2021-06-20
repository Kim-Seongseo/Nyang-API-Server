import { Repository, EntityRepository } from 'typeorm';
import { CertificationCode } from 'src/modules/certification-code/domain/entity/certification-code.entity';

@EntityRepository(CertificationCode)
export class CertificationCodeRepository extends Repository<CertificationCode> {}
