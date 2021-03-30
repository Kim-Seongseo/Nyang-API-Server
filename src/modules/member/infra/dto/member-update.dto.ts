import { ApiProperty } from '@nestjs/swagger';

// Request
export class UpdateMemberReqDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly nickname: string;
  @ApiProperty()
  readonly phone_number: string;
  @ApiProperty()
  readonly date_birth: Date;
}

// response: state
