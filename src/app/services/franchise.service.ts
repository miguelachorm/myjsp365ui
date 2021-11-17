import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Franchise } from "../models/franchise.model";

@Injectable()
export class FranchiseService {
  private franchise: Franchise;
  private frCollection: AngularFirestoreCollection<Franchise>;

  constructor(private afstore: AngularFirestore, private user: UserService) {
    this.frCollection = this.afstore.collection("franchise");
  }

  addFranchiseFromScratch(name: string, parent: string, parentRef: string, royalty: string, addSvcRoyalty: string, approvingEmail) {
    return this.frCollection.add({
      name,
      parent,
      parentRef,
      royalty,
      addSvcRoyalty,
      approvingEmail,
      createdAt: new Date()
    });
  }

  updateFranchise(franchiseId: string, franchise: Franchise) {
    return this.frCollection.doc(franchiseId).update({
      name: franchise.name,
      parent: franchise.parent,
      parentRef: franchise.parent,
      royalty: franchise.royalty,
      addSvcRoyalty: franchise.addSvcRoyalty})
  }

  getFranchise(franchiseId: string) {
    return this.afstore.collection("franchise").doc(franchiseId).valueChanges();
  }

  getFranchiseByApprovingEmail(email: string) {
    //return this.afstore.collection('franchise', ref => ref.where('approvingEmail','==',email)).snapshotChanges()
    const collection = this.afstore.collection<Franchise>("franchise", (ref) =>
      ref.where("approvingEmail", "==", email)
    );
    return collection.snapshotChanges()
  }

  setFranchise(franchise: Franchise) {
    this.franchise = franchise
  }
}
