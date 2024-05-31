import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  imports: [
    AccountModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
})
export class AppModule {}
