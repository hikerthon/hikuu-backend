import { Injectable } from '@nestjs/common';
import { Account } from './account';
// import { User } from './user';

@Injectable()
export class UserService {
  // users: Array<User> = [{ id: 1, gender: "AAA" }, { id: 2, gender: "BBB" }]

  login(account: Account) {
    console.log(account);
    // todo
  }

  logout(account: Account) {
    console.log(account);
    // todo
  }

}
