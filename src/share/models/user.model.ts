import { ApiProperty } from '@nestjs/swagger';

export class Account {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  userPwd: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  dob: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  serPwd: string;

  @ApiProperty()
  nationality: string;

  @ApiProperty()
  idNumber: string;

  @ApiProperty()
  mobileNumber: string;

  @ApiProperty()
  satelliteNumber: string;

  @ApiProperty()
  emergencyContact: string;

  @ApiProperty()
  emergencyNumber: string;

  @ApiProperty()
  fcmToken: string;

  constructor(userId: number, userPwd: string, firstName: string, lastName: string,
    gender: string, dob: string, address: string, email: string, serPwd: string,
    nationality: string, idNumber: string, mobileNumber: string, satelliteNumber: string,
    emergencyContact: string, emergencyNumber: string) {
    this.userId = userId;
    this.userPwd = userPwd;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.dob = dob;
    this.address = address;
    this.email = email;
    this.serPwd = serPwd;
    this.nationality = nationality;
    this.idNumber = idNumber;
    this.mobileNumber = mobileNumber;
    this.satelliteNumber = satelliteNumber;
    this.emergencyContact = emergencyContact;
    this.emergencyNumber = emergencyNumber;
  }
}

export class LoginData {
  @ApiProperty()
  email: string;

  @ApiProperty()
  userPwd: string;
}