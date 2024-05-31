import { AccountDTO } from '../dtos/account.dto';
import { CreateAccountDTO } from '../dtos/create-account.dto';

export interface IAccountRepository {
  create(createAccountDto: CreateAccountDTO): Promise<AccountDTO>;
  findByEmail(email: string): Promise<AccountDTO>;
}
