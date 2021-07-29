import {IsNotEmpty} from "class-validator";

export class CreateCaptchaDto {
    secret: string;

    @IsNotEmpty()
    response: string;

    remoteip: string;
}
