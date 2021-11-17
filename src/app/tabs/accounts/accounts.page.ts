import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { Account } from '../../models/account.model'
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {
  private accounts: Observable<Account[]>

  constructor(private acctService: AccountService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.accounts = this.acctService.getAccounts()
  }

  onSearchTerm(ev: CustomEvent) {
    const val = ev.detail.value;
  
    if (val && val.trim() !== '') {
      // this.accounts = this.accounts.filter(term => {
      //   return term.name.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
      // });
    }
  }
  
  onLogOut() {
    this.userService.signOut()
    this.router.navigateByUrl('/login')
  }
}
