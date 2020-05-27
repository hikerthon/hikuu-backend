import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsDefined, IsEmail, MaxLength, MinLength } from 'class-validator';

export class LoginDataDto {
  @ApiProperty({ type: 'string', format: 'email' })
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'string', format: 'password', maxLength: 255, minLength: 4 })
  @IsDefined()
  @MaxLength(255)
  @MinLength(4)
  password: string;
}

export class JwtDataDto {
  @ApiProperty({ type: 'string', format: 'byte', readOnly: true })
  @IsDefined()
  @IsBase64()
  access_token: string;

  @ApiProperty({ type: 'string', format: 'byte', readOnly: true })
  @IsDefined()
  @IsBase64()
  refresh_token: string;
}