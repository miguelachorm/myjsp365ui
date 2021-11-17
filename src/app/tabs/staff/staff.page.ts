import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { StaffService } from 'src/app/services/staff.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.page.html',
  styleUrls: ['./staff.page.scss'],
})
export class StaffPage implements OnInit {

  private staff: Observable<User[]>

  constructor(private staffService: StaffService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    if(this.userService.isAuthenticated()) {
      this.staff = this.staffService.getStaff()
    } else {
      this.router.navigateByUrl('login')
    }

  }

  onLogOut() {
    this.userService.signOut()
    this.router.navigateByUrl('/login')
  }

}
