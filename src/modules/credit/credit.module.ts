import { Module } from '@nestjs/common';
import { CreditService } from './credit.service';
import { CreditController } from './credit.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCredit, UserCreditSchema } from 'src/schemas/user-credit.schema';
import { RedisModule } from '../redis/redis.module';

@Module({
  controllers: [CreditController],
  providers: [CreditService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: UserCredit.name, schema: UserCreditSchema },
    ]),
  ],
  exports: [CreditService],
})
export class CreditModule {}
