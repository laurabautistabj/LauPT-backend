import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

import * as admin from 'firebase-admin';
import {ServiceAccount} from "firebase-admin/lib/credential";
import {firebaseMiddleware} from "./middlewares/firebase.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalPipes(new ValidationPipe());

  const adminConfig: ServiceAccount = {
    "projectId": 'srp-telematica',
    "privateKey": '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCnoUCAneSRifq1\ne4PIpG9JHOrL3Pl5WGB+YicKyw8rYHIiNA1RqXCvmwRmvo5tH1nCIvZphrvJbug7\nTFyb4tiiywiSv3XRjTfY66+5M5/7ufuN4GkpJpM2UaNpoUJfDG/WpttyCgKDRT7f\nX1yo24rC4dMUtgH5aaD6UGx1iCQj+l8aKu9HtkN9ATFxbJRqsa86MpGMVX0cjFKn\nb7tahwBEzloofd4g7BTaxLY+u7l6TJV9u7A93CxsPl0win79A7Tl9wG8+176vxB3\nUy0BRt1CsO/K1OTQLPbXkFS7fuRPkiom+DzoRPc8Usv8OOeDaT7pWa1JDlUHcuor\nBc1m/GWVAgMBAAECggEACmAsRmm/gpSoTIBrLUmkS8G69MhmNrEWM+xuXzgnZbdw\nCRbwthvHSk9Ni/CCj1WP8DjKyMhaqkKvpC/7UXjOkPEBRFgOelyD1uzrsQp1fhbK\nb8MyryXgmc2e0ER3f7uc1ov4bEwbULXCCQB1k0wXgC2LK66CW8ZCfQvqUrINDp7w\neXBQjNj39RZTV5aunL9lkIpq2NcIbiI7bpHQMpy3zftM3pMU4Tak3/iR1j42ud5z\n4pUMaUw45KUoJBuSygfeNb4ckmmhzDFrZP/HZ7uz6dI5ZwUhlZYcvbVsNyV6ADMe\nK4XPiT0MPE/AZAF+d7eYE9kk/sW3qZD/B5LpzArhMQKBgQDfUn6JkGkpbKAFwfOU\nrfwyREVoJKLnEIhhHUJTeFSZombTrek28tAlq4oRF6LGD9oaY1vCwgOcOMbnRvEi\n2NLl/H24Y8zDG/S6DKdA6gXzz8sJBAV226eDc/DEZzhhONvTBFTIouSGMNECve+B\n6cW/6++qYot/2f7IO56rej0jyQKBgQDAKI71Nvf7CucfgspNPSp4xJOeI8TOtTsY\npeXrH2LPegoydSgLycPUQuwmcUdGRazXHPdjgazRJe08Fp0O6+NLs8eVnRL0O7xS\nahe3vdJmRq6KhynDS7mW3hM/IrkbpIKBQF0lwsSo35WO0e/AtzN9w08Cv3cJGRdT\nSBsIHb1hbQKBgQCvXhCP5h8usGZZHx0wPBA3SPVX+q0R1iHCYT+cXHnSy30D7SWe\nSL67ViFtmqnv7rLO1gdQwRokq1FGfKcPPkUe5U+0ZGp/LIzZLOaKSzuxYhOGWOoR\nlBvPVlRTZtsXPZch9dy+UWwzFFKNXKmf0vu+4n+pxQjWtVEl2+uVrMAmQQKBgQCG\nHwkBMNfPOmHthY2MccfmOVbLhy3EFYzk/E5JWUPPit/5LfrAl5h+3CMWBfT4oIMu\nNgKaSpWD+dPnH+WJ161zVk1VKShknhko8PITBoQHbQhAmmzU6lLkcaa/Z44KND3+\n1xzs0VAQitZJtFCCk5x2CE9qnJcKG6BDOc3cUV2w1QKBgQClm/3H+sffr0K0f3bu\nfYM4bTbvE0p/U7NFtR9DKeFc12m+EK91i1z2uGZ8rJ0kgEZhf8HwjjMcUdtjRSHw\nNxClRaMSbHgPXfYN5XIv4pmyL0zIV1BL6H3AGwmCWswXTeco8ByzGXazD/Lek9E2\nzpPrflwSc6ss4xYVzqbpZ0oezw==\n-----END PRIVATE KEY-----\n'
        .replace(/\\n/g, '\n'),
    "clientEmail": 'firebase-adminsdk-bnxyy@srp-telematica.iam.gserviceaccount.com',
  };
  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig)
  });

  app.use(firebaseMiddleware);
  await app.listen(3000);
}
bootstrap();
