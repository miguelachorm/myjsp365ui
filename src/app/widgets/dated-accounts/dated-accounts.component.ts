import { Component, OnInit } from '@angular/core'
import { AccountService } from 'src/app/services/account.service';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core'
import { Observable } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dated-accounts',
  templateUrl: './dated-accounts.component.html',
  styleUrls: ['./dated-accounts.component.scss'],
})
export class DatedAccountsComponent implements OnInit {
  myDay: string
  private accounts: Observable<Account[]>

  constructor(private pickerCtrl: PickerController, private acctService: AccountService, private userService: UserService) { 
  }

  ngOnInit() {
    this.myDay = Date().substr(0,3).toLowerCase()
    const user = this.userService.getAuthorizedUser()
    if(user.role === 'owner' || user.role === 'admin') this.accounts = this.acctService.getAccountsByDay(this.myDay)
    if(user.role === 'staff') this.accounts = this.acctService.getAccountsByDayAndEmployee(this.myDay, user.companyName)
  }

}
