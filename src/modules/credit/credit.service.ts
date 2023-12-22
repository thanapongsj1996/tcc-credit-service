import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCredit } from 'src/schemas/user-credit.schema';
import { SaveCreditDto, UpdateCreditDto } from './dto/save-credit.dto';

@Injectable()
export class CreditService {
  constructor(
    @Inject(ConfigService)
    private configService: ConfigService,
    @InjectModel(UserCredit.name) private userCreditModel: Model<UserCredit>,
  ) {}

  async saveNewUserCredit(userId: string): Promise<UserCredit> {
    return this.saveCredit({ userId, credit: 10 });
  }

  async saveCredit(saveCreditDto: SaveCreditDto): Promise<UserCredit> {
    const UserCredit = new this.userCreditModel(saveCreditDto);
    return UserCredit.save();
  }

  async increaseCreditByUserId(
    updateCreditDto: UpdateCreditDto,
  ): Promise<void> {
    const { userId, credit } = updateCreditDto;
    await this.userCreditModel
      .findOneAndUpdate({ userId }, { $inc: { credit } })
      .exec();

    return;
  }

  async decreaseCreditByUserId(
    updateCreditDto: UpdateCreditDto,
  ): Promise<void> {
    const { userId, credit } = updateCreditDto;
    await this.userCreditModel
      .findOneAndUpdate({ userId }, { $inc: { credit: -credit } })
      .exec();

    return;
  }

  async getCreditByUserId(userId: string): Promise<UserCredit> {
    return this.userCreditModel.findOne({ userId }).exec();
  }

  async addCredit(data: any[]): Promise<void> {
    data.forEach(async (item) => {
      const { userId, amount } = item;
      await this.userCreditModel
        .findOneAndUpdate({ userId }, { $inc: { credit: amount } })
        .exec();
    });
  }

  async deductCredit(data: any[]): Promise<void> {
    data.forEach(async (item) => {
      const { userId, amount } = item;
      await this.userCreditModel
        .findOneAndUpdate({ userId }, { $inc: { credit: -amount } })
        .exec();
    });
  }
}
