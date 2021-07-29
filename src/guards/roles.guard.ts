import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            return false;
        }
        if (!user.customClaims) {
            return false;
        }
        const customClaims = user.customClaims;
        if (roles.includes(AppRoles.STUDENT) && customClaims.isStudent) {
            return true;
        } else if (roles.includes(AppRoles.PROFESSOR) && customClaims.isProfessor) {
            return true;
        } else return !!(roles.includes(AppRoles.ADMIN) && customClaims.isAdmin);
    }
}


export enum AppRoles {
    ADMIN = 'admin',
    PROFESSOR = 'professor',
    STUDENT = 'student'
}
