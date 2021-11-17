import { Component, OnInit, OnDestroy } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { FormValidator } from "../form-validator/form-validator";
import { FranchiseService } from "../services/franchise.service";
import { LoaderService } from '../services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit, OnDestroy {
  username: string = "";
  password: string = "";
  cpassword: string = "";
  role: string = "";
  approvingEmail: string = "";
  user: any
  franchise: any
  loading: any
  franchiseSubscription: Subscription

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    private userService: UserService,
    private frmValidator: FormValidator,
    private frService: FranchiseService,
    private loader: LoaderService
  ) { }

  ngOnInit() { }

  ngOnDestroy() {
    if(this.franchiseSubscription) this.franchiseSubscription.unsubscribe()
  }

  async register() {
    const { username, password, cpassword, role, approvingEmail } = this;
    if (password !== cpassword) {
      this.showAlert("Error!", "Passwords do not match!");
      return console.error("Password do not match");
    }

    if (role !== "" && role !== "owner") {
      const isValidEmail: any = this.frmValidator.emailValidator(
        approvingEmail
      );
      if (!isValidEmail.valid) {
        this.showAlert("Error!", "Approving Email missing!");
        return console.error("Approving Email missing");
      }
    }

    try {
      this.loader.showLoader()
      if (role !== "owner") {
        this.franchiseSubscription = this.frService.getFranchiseByApprovingEmail(approvingEmail).subscribe(async (data) => {
          this.franchise = data.map((e) => {
            return {
              id: e.payload.doc.id
            }
          })
          if (this.franchise.length < 1) {
            this.loader.hideLoader()
            this.showAlert("Error!", "Franchise not found!")
            return console.error("Franchise not found!");
          } else {
            await this.justCreateUser().then((noOwner) => {
              if (noOwner) {
                const id: string = noOwner.uid;
                const email: string = noOwner.email;
                this.userService.addUser(this.franchise[0].id, id, "", "", "", email, role, "", "pending").then(() => {
                  this.loader.hideLoader()
                  this.userService.signOut()
                  this.router.navigate(["/login"])
                })
              }
            })
          }
        })
      } else {
        this.justCreateUser().then(async user => {
          if(user) {
            const franchise = await this.frService.addFranchiseFromScratch("","","","","",user.email)
            await this.userService.addUser(franchise.id,user.uid,"","","",user.email,"owner","","approved")
            this.loader.hideLoader()
            this.showAlert(
              "Success!",
              "Now, Login to complete your profile!"
            )
            this.userService.signOut()
            this.router.navigate(["/login"])
          }
        })
      }
    } catch (err) {
      console.dir(err)
      this.loader.hideLoader()
      this.showAlert("Error!", err.message);
    }
  }

  async justCreateUser() {
    const { username, password } = this;
    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(
        username,
        password
      )
      return res.user
    } catch (err) {
      console.dir(err)
      this.showAlert("Error!", err.message)
      return null
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["OK"],
    });

    await alert.present();
  }
}
