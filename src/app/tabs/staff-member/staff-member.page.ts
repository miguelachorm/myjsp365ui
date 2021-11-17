import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account.model'
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ToastController } from '@ionic/angular';
import { FormValidator } from 'src/app/form-validator/form-validator';
import { User } from 'src/app/models/user.model';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-account',
  templateUrl: './staff-member.page.html',
  styleUrls: ['./staff-member.page.scss'],
})
export class StaffMemberPage implements OnInit {

  formValid: boolean = false

  member: User = {
    franchiseId: '',
    name: '',
    phone: '',
    companyName: '',
    cell: '',
    email: '',
    role: '',
    status: ''
  }

  constructor(private activatedRoute: ActivatedRoute, 
      private staffService: StaffService,
      private toastController: ToastController,
      private router: Router,
      private fvService: FormValidator) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    if(id) {
      this.staffService.getMember(id).subscribe(member => {
        this.member = member
      })
    }
  }

  deleteMember() {
    this.staffService.deleteMember(this.member.id).then(() => {
      const newLocal = this.router.navigate(['/tabs/staff'])
      this.showToast('Member Deleted')
    }), err => {
      this.showToast('There was an issue deleting the Member')
    } 
  }

  updateMember() {
    this.staffService.updateMember(this.member).then(() => {
      const newLocal = this.router.navigate(['/tabs/staff']);
      this.showToast('Member updated')
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
    // const name = this.fvService.stringValidator(this..name)
    // const amount = this.fvService.stringValidator(this.account.amount)
    // if(name && amount) {
    //   this.formValid = true
    // } else {
    //   this.formValid = false
    // }
  }

}
