import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { CreditModule } from './modules/credit/credit.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from './modules/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appConfig] }),
    CreditModule,
    RedisModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
  ],
})
export class AppModule {}
