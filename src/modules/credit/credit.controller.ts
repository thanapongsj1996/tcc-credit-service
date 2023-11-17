import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { CreditService } from './credit.service';
import { SaveCreditDto, UpdateCreditDto } from './dto/save-credit.dto';

@Controller('credit')
export class CreditController {
  constructor(private readonly creditService: CreditService) {}

  @Post()
  saveCredit(@Body() saveCreditDto: SaveCreditDto) {
    return this.creditService.saveCredit(saveCreditDto);
  }

  @Put('increase')
  increaseCreditByUserId(@Body() updateCreditDto: UpdateCreditDto) {
    return this.creditService.increaseCreditByUserId(updateCreditDto);
  }

  @Put('decrease')
  decreaseCreditByUserId(@Body() updateCreditDto: UpdateCreditDto) {
    return this.creditService.decreaseCreditByUserId(updateCreditDto);
  }

  @Get(':userId')
  getCreditByUserId(@Param('userId') userId: string) {
    return this.creditService.getCreditByUserId(userId);
  }
}
