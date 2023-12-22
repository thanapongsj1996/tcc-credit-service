// src/redis/redis.service.ts

import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { CreditService } from '../credit/credit.service';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  // initialize redis client
  constructor(
    @Inject(CreditService)
    private creditService: CreditService,
  ) {
    this.redisClient = new Redis(
      process.env.REDIS_URL || 'redis://localhost:6379',
    );
  }

  onModuleInit() {
    this.subscribe('user_created');
    this.subscribe('lotto_reward');
    this.subscribe('lotto_purchase');
    this.redisClient.on('message', (channel, message) => {
      console.log('message: ', message);
      console.log('channel: ', channel);

      const { data } = JSON.parse(message);
      if (channel === 'user_created') {
        this.creditService.saveNewUserCredit(data.id as string);
      }

      if (channel === 'lotto_reward') {
        this.creditService.addCredit(data);
      }

      if (channel === 'lotto_purchase') {
        this.creditService.deductCredit(data);
      }
    });
  }

  subscribe(channel: string): void {
    this.redisClient.subscribe(channel);
  }

  getClient(): Redis {
    return this.redisClient;
  }
}
