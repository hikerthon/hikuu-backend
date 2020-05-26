import { ApiProperty } from "@nestjs/swagger";
import { IsDefined } from "class-validator";

export class UserToken {

  @ApiProperty()
  @IsDefined()
  token: string;
}