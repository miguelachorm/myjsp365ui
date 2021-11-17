import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Subscription } from 'rxjs';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-business-stats',
  templateUrl: './business-stats.component.html',
  styleUrls: ['./business-stats.component.scss'],
})
export class BusinessStatsComponent implements OnInit {
  accountsSubscription: Subscription
  usersSubcription: Subscription
  businessValue: number
  monthGross: number
  employeesNumber: number
  accountsNumber: number


  constructor(private acctService: AccountService, private staffService: StaffService) { }

  ngOnInit() {  
    this.accountsSubscription = this.acctService.getAccounts().subscribe(accounts => { 
      this.monthGross = 0
      this.accountsNumber = accounts.length
      accounts.forEach((acc) => {
        this.monthGross += parseInt(acc.amount)
      })
      console.log(this.monthGross * 4)
      this.businessValue = this.monthGross * 4
    })

    this.usersSubcription = this.staffService.getStaff().subscribe(staff => {
      this.employeesNumber = staff.length
    })
  }

  ngOnDestroy() {
    this.accountsSubscription.unsubscribe()
  }

}
