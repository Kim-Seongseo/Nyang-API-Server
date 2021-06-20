import { IsBoolean, IsNumber } from 'class-validator';

export class MemberAuthInfoDto {
  @IsNumber()
  readonly identifier: number;

  @IsBoolean()
  readonly isAdmin: boolean;
}
