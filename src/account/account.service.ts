import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { excludeField } from 'src/shared/helpers/exclude-field';
import { AccountRepository } from './account.repository';
import { AccountWithoutPasswordDTO } from './dtos/account-without-password.dto';
import { AccountDTO } from './dtos/account.dto';
import { CreateAccountDTO } from './dtos/create-account.dto';

@Injectable()
export class AccountService {
  private salt: number = Number(process.env.SALT) || 10;

  constructor(private readonly accountRepository: AccountRepository) {}

  async create(
    createAccountDTO: CreateAccountDTO,
  ): Promise<AccountWithoutPasswordDTO> {
    const salt = await bcrypt.genSalt(this.salt);
    const hash = await bcrypt.hash(createAccountDTO.password, salt);
    const account = await this.accountRepository.create({
      ...createAccountDTO,
      password: hash,
    });
    const accountWithoutPassword = excludeField(account, ['password']);
    return Promise.resolve(accountWithoutPassword);
  }

  findByEmail(email: string): Promise<AccountDTO> {
    return this.accountRepository.findByEmail(email);
  }
}
