import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account.model'
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ToastController } from '@ionic/angular';
import { FormValidator } from 'src/app/form-validator/form-validator';
import { StaffService } from 'src/app/services/staff.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  formValid: boolean = false
  staff: User[]

  account: Account = {
    name : '',
    address: '',
    geoLat: '',
    geoLon: '',
    amount: '',
    cleaningArea: '',
    alarmKey: '',
    status: '',
    assignedTo: '',
    franchiseId: '',
    schedule: { mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false, wke: false},
    contact: { name: '', phone: '', cell: '', email: '' }
  }

  constructor(private activatedRoute: ActivatedRoute, 
      private acctService: AccountService,
      private staffService: StaffService,
      private toastController: ToastController,
      private router: Router,
      private fvService: FormValidator) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    if(id) {
      this.acctService.getAccount(id).subscribe(account => {
        this.account = account
      })
    }
    this.staffService.getVendors().subscribe((vendors) => { 
      this.staff = vendors
    })
  }

  addAccount() {
    this.account.createdAt = new Date()
    this.acctService.addAccount(this.account).then(() => {
      const newLocal = this.router.navigate(['/tabs/accounts'])
      this.showToast('Account Added')
    }), err => {
      this.showToast('There was an issue adding the Account')
    } 
  }

  deleteAccount() {
    this.acctService.deleteAccount(this.account.id).then(() => {
      const newLocal = this.router.navigate(['/tabs/accounts'])
      this.showToast('Account Deleted')
    }), err => {
      this.showToast('There was an issue deleting the Account')
    } 
  }

  updateAccount() {
    this.acctService.updateAccount(this.account).then(() => {
      const newLocal = this.router.navigate(['/tabs/accounts']);
      this.showToast('Account updated')
    }), err => {
      this.showToast('There was an issue updating the Account')
    } 
  }

  showToast(msg) {
    this.toastController.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present())
  }

  fieldsValidator() {
    const name = this.fvService.stringValidator(this.account.name)
    const amount = this.fvService.stringValidator(this.account.amount)
    if(name && amount) {
      this.formValid = true
    } else {
      this.formValid = false
    }
  }

}
