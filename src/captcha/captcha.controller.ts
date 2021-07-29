import { Controller, Post, Body } from '@nestjs/common';
import { CaptchaService } from './captcha.service';
import { CreateCaptchaDto } from './dto/create-captcha.dto';

@Controller('captcha')
export class CaptchaController {
  constructor(private readonly captchaService: CaptchaService) {}

  @Post()
  create(@Body() createCaptchaDto: CreateCaptchaDto) {
    return this.captchaService.create(createCaptchaDto);
  }
}
