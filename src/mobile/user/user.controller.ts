import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Account } from './account';
// import { User } from './user';
import { UserService } from './user.service';


@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private srv: UserService) { }

  @Post('login')
  @ApiResponse({ status: 200, description: 'Return user location' })
  login(@Body() account: Account) {
    this.srv.login(account);
  }

  @Post('logout')
  @ApiResponse({ status: 200, description: 'Return user location' })
  logout(@Body() account: Account) {
    this.srv.logout(account);
  }

  // GET /user/{userId}
  // PATCH /user/{userId}
  // @Get()
  // getUsers() {
  //   return this.srv.getUsers();
  // }




}
