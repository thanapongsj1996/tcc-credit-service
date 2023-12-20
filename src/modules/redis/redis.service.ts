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
    this.redisClient.on('message', (channel, message) => {
      console.log('message: ', message);
      console.log('channel: ', channel);

      const { data } = JSON.parse(message);
      this.creditService.saveNewUserCredit(data.id as string);
    });
  }

  subscribe(channel: string): void {
    this.redisClient.subscribe(channel);
  }

  getClient(): Redis {
    return this.redisClient;
  }
}
