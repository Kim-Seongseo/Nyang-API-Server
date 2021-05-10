import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

//Request
export class QuestionSearchReqDto {
  @ApiProperty()
  @IsString()
  readonly keyword: string;
}

//Response
