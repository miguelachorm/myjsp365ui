import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { first, take, map, switchMap } from 'rxjs/operators'
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { User } from '../models/user.model'
import { Observable } from 'rxjs';
import { UserService } from './user.service';


@Injectable()
export class StaffService {
    private staff: Observable<User[]>
    private staffCollection: AngularFirestoreCollection<User>
    private activeMember: User

    constructor(private afs: AngularFirestore, private userService: UserService) {
        this.activeMember = this.userService.getAuthorizedUser()
        if(this.activeMember.role == "owner") {
            this.staffCollection = this.afs.collection('franchise').doc(this.activeMember.franchiseId).collection('users')
        } else {
            this.staffCollection = this.afs.collection('franchise').doc(this.activeMember.franchiseId).collection('users', ref => ref.where("role","==","staff"))
        }
        this.staff = this.staffCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data()
                    const id = a.payload.doc.id
                    return { id, ...data}
                })
            })
        )
    }

    getStaff(): Observable<User[]> {
        return this.staff
    }

    getVendors(): Observable<User[]> {
        return this.staff.pipe(
            map(member => {
                return member.filter(e => e.role == "staff" && e.companyName != "")
            })
        ) 
    }
    
    getMember(id: string): Observable<User> {
        return this.staffCollection.doc<User>(id).valueChanges().pipe( 
            take(1),
            map(account => {
                account.id = id
                return account
            })
        )
    }

    updateMember(member: User): Promise<void> {
        return this.staffCollection.doc(member.id).update( {
            name: member.name,
            phone: member.phone,
            companyName: member.companyName,
            cell: member.phone,
            role: member.role,
            status: member.status
        })
        return null
    }

    deleteMember(id: string): Promise<void> {
        return this.staffCollection.doc(id).delete()
    }

}