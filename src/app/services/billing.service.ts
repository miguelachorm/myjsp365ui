import { Injectable } from "@angular/core";
import {
  AngularFirestore
} from "@angular/fire/firestore";

import { Billing } from '../models/billing.model';

@Injectable()
export class BillingService {

  constructor(private afstore: AngularFirestore) {
  }

  addBillingInfo(franchiseId: string, billInfo: Billing) {
    return this.afstore.collection("franchise").doc(franchiseId).collection("billing").add({
      addressl1: billInfo.addressl1,
      city: billInfo.city,
      state: billInfo.state,
      zip: billInfo.zip,
      ccName: billInfo.ccName,
      ccNumber: billInfo.ccNumber,
      ccExpMonth: billInfo.ccExpMonth,
      ccExpYear: billInfo.ccExpYear,
      ccCsv: billInfo.ccCsv,
      ccAgreement: billInfo.ccAgreement,
      createdAt: new Date()
    });
  }

  getBillingInfo(franchiseId: string) {
    return this.afstore.collection("franchise").doc(franchiseId).collection("billing").valueChanges();
  }
}
