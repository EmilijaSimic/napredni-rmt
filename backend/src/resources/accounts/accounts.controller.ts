import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { LoginDto } from './dto/login.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.accountsService.login(loginDto);
  }

  @Get('me')
  async me(@Headers('authorization') authHeader: string) {
    return await this.accountsService.me(authHeader);
  }
}
