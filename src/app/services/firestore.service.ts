import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type CollectionPredicate<T> = string | AngularFirestoreCollection<T>
type DocPredicate<T>  = string | AngularFirestoreDocument<T>

@Injectable()
export class FirestoreService {
    constructor(private afs: AngularFirestore) {}

    col<T>(ref: CollectionPredicate<T>, queryFn?): AngularFirestoreCollection<T> {
        return typeof ref === 'string' ? this.afs.collection<T>( ref ,queryFn) : ref
    }

    doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
        return typeof ref === 'string' ? this.afs.doc<T>( ref ) : ref
    }

    //get

    // doc$<T>(ref: DocPredicate<T>): Observable<T> {
    //     return this.doc(ref).snapshotChanges().pipe(map (doc => {
    //         return doc.payload.data() as T
    //     })
    // }

    // col$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    //     return this.col(ref, queryFn).snapshotChanges().pipe(
    //         map(docs => {
    //         return docs.map(a => a.payload.doc.data()) as T[]
    //     })
    // }
}