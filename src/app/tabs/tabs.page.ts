import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  user: User = {
    franchiseId: '',
    name: '',
    phone: '',
    companyName: '',
    cell: '',
    email: '',
    role: '',
    status: ''
  }
  private isAuthorized = false
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) { 
    if(this.userService.isAuthenticated()) {
      this.user = this.userService.getAuthorizedUser()
    } else {
      this.router.navigateByUrl('/login')
    }
  }

  ngOnInit() {

  }

}
