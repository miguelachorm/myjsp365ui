import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { FranchiseService } from "src/app/services/franchise.service";
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Franchise } from 'src/app/models/franchise.model';
import { Billing } from 'src/app/models/billing.model';
import { RegisterFormService } from 'src/app/services/register-form.service';
import { BillingService } from 'src/app/services/billing.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.page.html",
  styleUrls: ["./register-form.page.scss"],
})
export class RegisterFormPage implements OnInit {
  segment: string = "";
  user: User
  franchise: Franchise

  billing: Billing = {
    addressl1: '',
    city: '',
    state: '',
    zip: '',
    ccName: '',
    ccNumber: '',
    ccExpMonth: '',
    ccExpYear: '',
    ccCsv: '',
    ccAgreement: false
  }

  submitEnabled: boolean = false;

  fFormReady: boolean = false;
  oFormReady: boolean = false;
  bFormReady: boolean = false;

  constructor(
    private userService: UserService,
    private frService: FranchiseService,
    private regFormService: RegisterFormService,
    private billingService: BillingService,
    private loader: LoaderService,
    private router: Router
  ) {
    this.user = this.userService.getAuthorizedUser()
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
   this.frService.getFranchise(this.user.franchiseId).subscribe((frc: Franchise) => {
      this.submitEnabled = false
      this.franchise = frc
      if(this.user.role === 'owner') {
        this.segment = 'company'
      } else {
        this.segment = 'user'
      }
    })
  }

  segmentChanged(ev: any) {
    //console.log("Segment changed", ev.detail.value);
  }

  validateFranchiseForm() {
    this.fFormReady = this.regFormService.formFranchiseValidator(this.franchise);
    this.checkAllForms();
  }

  validateUserForm() {
    this.oFormReady = this.regFormService.formUserValidator(this.user);
    this.checkAllForms();
  }

  validateBillingForm() {
    console.log(this.billing)
    this.bFormReady = this.regFormService.formBillingValidator(this.billing);
    this.checkAllForms();
  }

  checkAllForms() {
    if (this.user.role === "owner") {
      if (this.fFormReady && this.oFormReady && this.bFormReady) {
        this.submitEnabled = true;
      } else {
        this.submitEnabled = false;
      }
    } else if (this.user.role === "admin" || this.user.role === "staff") {
      if (this.oFormReady) {
        this.submitEnabled = true
      } else {
        this.submitEnabled = false
      }
    }
  }

  async onSubmitButtonClicked() {
    try {
      this.loader.showLoader()
      this.user.status = 'active'
      if(this.user.role === "owner") {
        await this.frService.updateFranchise(this.user.franchiseId, this.franchise)
        await this.billingService.addBillingInfo(this.user.franchiseId,this.billing)
      }
      await this.userService.updateUser(this.user)
      this.loader.hideLoader()
      this.submitEnabled = false
      this.router.navigate(['/tabs'])
    }
    catch(e) {
      console.log(e)
      this.loader.hideLoader()
      return
    }
  }


  onLeftClicked() {
    if(this.segment === 'billing') {
      this.segment = "user"
    } else if(this.segment === 'user') {
      this.segment = 'company'
    }
  }

  onRightClicked() {
    if(this.segment === 'company') {
      this.segment = "user"
    } else if(this.segment === 'user') {
      this.segment = 'billing'
    }
  }
}
