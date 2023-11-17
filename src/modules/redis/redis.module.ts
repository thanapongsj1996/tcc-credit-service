// src/redis/redis.module.ts

import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { CreditModule } from '../credit/credit.module';

@Module({
  providers: [RedisService],
  exports: [RedisService],
  imports: [CreditModule],
})
export class RedisModule {}
