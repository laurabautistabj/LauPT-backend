import {HttpModule, Module} from '@nestjs/common';
import { CaptchaService } from './captcha.service';
import { CaptchaController } from './captcha.controller';

@Module({
  imports: [HttpModule],
  controllers: [CaptchaController],
  providers: [CaptchaService]
})
export class CaptchaModule {}
