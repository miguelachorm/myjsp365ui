import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { first, take, map, switchMap } from 'rxjs/operators'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../models/user.model'


@Injectable()
export class UserService {
    user: User
    userCollection: AngularFirestoreCollection

    constructor (private afAuth: AngularFireAuth, private afs: AngularFirestore) {
        //this.userRef = afs.collection('accounts')
    }

    setUser(user: User) {
        this.user = user
    }

    getAuthorizedUser() {
        return this.user
    }

    async isAuthenticated() {
        if(this.user) return true

        const user = await this.afAuth.authState.pipe(first()).toPromise()

        if(user.uid) {
            console.log(user.email)
            this.afs.collectionGroup('users', ref => ref.where("email","==", user.email)).snapshotChanges().subscribe(data => {
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
                return true
            })
        }

        return false
    }

    signOut() {
        this.afAuth.signOut()
    }


    addUser(franchiseId: string, id: string, name: string, phone: string, cell: string, email: string, role: string, companyName: string, status: string) {
        return this.afs.collection('franchise').doc(franchiseId).collection('users').doc(id).set({
            name, phone, cell, email, role, companyName, status, franchiseId
        })
    }

    getUID() {
        return this.user.id
    } 

    getUser(email: string) {
        return this.afs.collectionGroup('users', ref => ref.where("email","==", email)).snapshotChanges()
    }

    updateUser(data: User) {
        return this.afs.collection('franchise').doc(data.franchiseId).collection('users').doc(data.id).update({
            companyName: data.companyName,
            name: data.name,
            phone: data.phone,
            cell: data.cell,
            status: data.status
        })
    }

}