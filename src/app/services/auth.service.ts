import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service'

@Injectable()
export class AuthService {
    constructor( public router: Router, private user: UserService) {

    }

    async canActivate() {
        if(this.user.isAuthenticated()) {
            return true
        }

        this.router.navigate(['/login'])
        return false

    }
}