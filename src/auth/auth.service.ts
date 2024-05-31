import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccountDTO } from 'src/account/dtos/account.dto';
import { excludeField } from 'src/shared/helpers/exclude-field';
import { AuthWithTokenDTO } from './dtos/auth-with-token.dto';
import { AuthDTO } from './dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signIn(
    accountToSignIn: AuthDTO,
    accountRegistered: AccountDTO,
  ): Promise<AuthWithTokenDTO> {
    const isAuthorized = await bcrypt.compare(
      accountToSignIn.password,
      accountRegistered.password,
    );

    if (!isAuthorized) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: excludeField(accountRegistered, ['password']),
    };

    return Promise.resolve({
      ...excludeField(accountRegistered, ['password']),
      token: await this.jwtService.signAsync(payload),
    });
  }
}
