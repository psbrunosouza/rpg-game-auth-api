import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './../account/account.service';
import { AuthService } from './auth.service';
import { AuthDTO } from './dtos/auth.dto';

@Controller('sign-in')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly accountService: AccountService,
  ) {}

  @Post()
  async signIn(@Body() authDTO: AuthDTO): Promise<any> {
    const account = await this.accountService.findByEmail(authDTO.email);
    return this.authService.signIn(authDTO, account);
  }
}
