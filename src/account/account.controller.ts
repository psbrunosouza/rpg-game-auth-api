import { Body, Controller, Post } from '@nestjs/common';

import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaMessage } from 'kafkajs';
import { EmailAlreadyInUseException } from 'src/shared/exceptions/email-already-in-use.exception';
import { AccountService } from './account.service';
import { AccountWithoutPasswordDTO } from './dtos/account-without-password.dto';
import { CreateAccountDTO } from './dtos/create-account.dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async create(
    @Body() createAccountDTO: CreateAccountDTO,
  ): Promise<AccountWithoutPasswordDTO> {
    const account = await this.accountService.findByEmail(
      createAccountDTO.email,
    );

    if (account?.id) {
      throw new EmailAlreadyInUseException();
    }

    return this.accountService.create(createAccountDTO);
  }

  @MessagePattern('topico-exemplo')
  consumer(@Payload() message: KafkaMessage): void {
    console.log(message);
  }
}
