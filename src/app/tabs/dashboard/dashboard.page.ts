import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

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
  today: string
  todaysDay: string

  constructor(private router: Router, private userService: UserService) { 
  }

  ngOnInit() {
    if(!this.userService.isAuthenticated()) {
      this.router.navigateByUrl('login')
    } else {
      this.user = this.userService.getAuthorizedUser()
      this.today = Date()
      this.todaysDay = Date().substr(0,3).toLowerCase()
    }
    console.log(this.todaysDay)
  }

  ngAfterViewInit() {
  }

  onLogOut() {
    this.userService.signOut()
    this.router.navigateByUrl('/login')
  }

  clockIn() {

  }

  clockOut() {

  }

}
