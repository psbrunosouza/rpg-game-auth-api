import { Injectable } from '@nestjs/common';
import { PrismaService } from './../shared/database/prisma.service';
import { AccountDTO } from './dtos/account.dto';
import { CreateAccountDTO } from './dtos/create-account.dto';
import { IAccountRepository } from './interfaces/IAccountRepository';

@Injectable()
export class AccountRepository implements IAccountRepository {
  repository = this.PrismaService.account;

  constructor(private readonly PrismaService: PrismaService) {}

  findByEmail(email: string): Promise<AccountDTO> {
    return this.repository.findFirst({ where: { email } });
  }

  create(createAccountDTO: CreateAccountDTO): Promise<AccountDTO> {
    return this.repository.create({ data: createAccountDTO });
  }
}
