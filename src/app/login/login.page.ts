import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { RegisterFormService } from '../services/register-form.service';
import { FormValidator } from '../form-validator/form-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""
  user: User

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    private userService: UserService,
    private formValidator: FormValidator
  ) { }

  ngOnInit() {
  }

  async login() {
    const { username, password } = this
    const checkEmailValidation = this.formValidator.emailValidator(username)
    if(!checkEmailValidation.valid) {
      this.showAlert("Error!","Invalid Email!")
      return
    }

    try {
      const res = await this.afAuth.signInWithEmailAndPassword(username, password)
      // if(res.user) {
      // }
      this.userService.getUser(res.user.email).subscribe(data => {
        const users = data.map((e) => {
          return {
            id: e.payload.doc.id,
            info: e.payload.doc.data()
          }
        })
        let info = users[0].info
        info["id"] = users[0].id
        this.user = { id: info["id"], name: info["name"], franchiseId: info["franchiseId"],
                      phone: info["phone"], cell: info["cell"], 
                      email: info["email"], companyName: info["companyName"], 
                      role: info["role"], status: info["status"] }
        this.userService.setUser(this.user)
        this.routeUserByStatus()
      })

    } catch(err) {
      console.dir(err)
      if(err.code === 'auth/user-not-found') {
        this.showAlert("Error!","User not found!")
      }
      if(err.code === 'auth/wrong-password') {
        this.showAlert("Error!","Password error!")
      }
      if(err.code === 'auth/invalid-email') {
        this.showAlert("Error!","Invalid Email!")
      }
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["OK"]
    })

    await alert.present()
  }

  routeUserByStatus() {
    switch (this.user.status) {
      case "active":
        this.router.navigate(["/tabs"])
        break
      case "pending":
        this.showAlert("Info!","Your account is waiting for Franchise Owner approval")
        this.userService.signOut()
        break
      case "approved":
        this.router.navigate(["/register/register-form"])
        break
      case "suspended":
        this.showAlert("Error!","Your account has been suspended!")
        this.userService.signOut()
        break
    }
  }

}
