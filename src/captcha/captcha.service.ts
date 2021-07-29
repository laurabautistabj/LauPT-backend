import {HttpService, Injectable} from '@nestjs/common';
import {CreateCaptchaDto} from './dto/create-captcha.dto';
import {UpdateCaptchaDto} from './dto/update-captcha.dto';

@Injectable()
export class CaptchaService {

    constructor(private httpService: HttpService) {
    }

    async create(createCaptchaDto: CreateCaptchaDto) {
        createCaptchaDto.secret = '6Lck7PEaAAAAANKiMtWupZ63KW4dUYtBCqRYfWcs';
        const bodyData = `secret=${createCaptchaDto.secret}&response=${createCaptchaDto.response}`;
        const response = await this.httpService.post(
            'https://www.google.com/recaptcha/api/siteverify',
            bodyData,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).toPromise();
        return response.data;
    }

    findAll() {
        return `This action returns all captcha`;
    }

    findOne(id: number) {
        return `This action returns a #${id} captcha`;
    }

    update(id: number, updateCaptchaDto: UpdateCaptchaDto) {
        return `This action updates a #${id} captcha`;
    }

    remove(id: number) {
        return `This action removes a #${id} captcha`;
    }
}
