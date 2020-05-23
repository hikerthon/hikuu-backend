import { Injectable } from '@nestjs/common';
import { Account, LoginData } from '../../share/models/user.model';


@Injectable()
export class UserService {
  account: Account = {
    userId: 1,
    userPwd: 'iliketopoo',
    firstName: 'Tony',
    lastName: 'Lin',
    gender: 'M',
    dob: '2000-01-01',
    address: 'aoyuan, St.Somewhere No.99',
    email: 'tonylsn@gmail.com',
    serPwd: '0965-123-4567',
    nationality: 'Taiwan',
    idNumber: 'AB12345',
    mobileNumber: '0965-123-4567',
    satelliteNumber: '0965-123-4567',
    emergencyContact: 'Annice',
    emergencyNumber: '0965-123-4567',
  };

  getUser(userId: number) {
    return this.account;
  }

  createUser(account: Account) {
    // create user
    return true;
  }

  login(loginData: LoginData) {
    // login
    return true;
  }

  logout() {
    // logout
    return true;
  }

  updateUser(userId: number, account: Account) {
    // update user
    const newAccount = this.account;
    newAccount.gender = 'F';
    return newAccount;
  }




}
