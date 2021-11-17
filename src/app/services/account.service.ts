import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Account } from "../models/account.model";
import {
  AngularFirestoreCollection,
  AngularFirestore,
  DocumentReference,
} from "@angular/fire/firestore";
import { map, take } from "rxjs/operators";
import { UserService } from "./user.service";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  private accounts: Observable<Account[]>
  private accountCollection: AngularFirestoreCollection<Account>
  private activeUser: User

  constructor(private afs: AngularFirestore, private userService: UserService) {
    this.activeUser = this.userService.getAuthorizedUser();
    this.accountCollection = this.afs
      .collection("franchise")
      .doc(this.activeUser.franchiseId)
      .collection("accounts")
    this.accounts = this.accountCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }
        })
      })
    )
  }

  getAccounts(): Observable<Account[]> {
    return this.accounts;
  }

  getAccount(id: string): Observable<Account> {
    return this.accountCollection
      .doc<Account>(id)
      .valueChanges()
      .pipe(
        take(1),
        map((account) => {
          account.id = id
          return account
        })
      )
  }

  getAccountsByDay(day: string): Observable<Account[]> {
    if(day == 'fri' || day == 'sat' || day == 'sun') {
        return this.accounts.pipe(
            map((account) => {
              return account.filter((e) => e.schedule[day] || e.schedule['wke'])
            })
        )
    } else {
        return this.accounts.pipe(
            map((account) => {
              return account.filter((e) => e.schedule[day])
            })
        )
    }
  }

  getAccountsByDayAndEmployee(day: string, user: string): Observable<Account[]> {
    if(day == 'fri' || day == 'sat' || day == 'sun') {
        return this.accounts.pipe(
            map((account) => {
              return account.filter((e) => e.schedule[day] || e.schedule['wke'] && e.assignedTo === user);
            })
        )
    } else {
        return this.accounts.pipe(
            map((account) => {
              return account.filter((e) => e.schedule[day] && e.assignedTo === user)
            })
        )
    }
  }

  updateAccount(account: Account): Promise<void> {
    return this.accountCollection.doc(account.id).update({
      name: account.name,
      address: account.address,
      geoLat: account.geoLat,
      geoLon: account.geoLon,
      amount: account.amount,
      cleaningArea: account.cleaningArea,
      alarmKey: account.alarmKey,
      status: account.status,
      assignedTo: account.assignedTo,
      schedule: account.schedule,
      contact: account.contact,
    })
  }

  addAccount(account: Account): Promise<DocumentReference> {
    return this.accountCollection.add(account)
  }

  deleteAccount(id: string): Promise<void> {
    return this.accountCollection.doc(id).delete()
  }

  getMonthGrossEarnings() {
    // let gross = 0
    // return this.accounts.pipe(
    //     map((account) => {
    //       gross = gross + account.amount
    //     })
    // )
  }
}
