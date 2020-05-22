import { ApiProperty } from "@nestjs/swagger";

export class User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  nationality: string;

  @ApiProperty()
  passportNumber: string;

  @ApiProperty()
  telephoneNumber: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  emergencyContactName: string;

  @ApiProperty()
  emergencyContactNumber: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  satellitePhoneNumber: string;

  @ApiProperty()
  address: string;
}