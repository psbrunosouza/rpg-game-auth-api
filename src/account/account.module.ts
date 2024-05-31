import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { AccountController } from './account.controller';
import { AccountRepository } from './account.repository';
import { AccountService } from './account.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService, PrismaService, AccountRepository],
  exports: [AccountService],
})
export class AccountModule {}
