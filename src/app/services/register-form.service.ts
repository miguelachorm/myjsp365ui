import { Injectable } from '@angular/core'
import { Franchise } from '../models/franchise.model'
import { User } from '../models/user.model'
import { Billing } from '../models/billing.model'

@Injectable()
export class RegisterFormService {
    constructor(){}

    formFranchiseValidator(form: Franchise) {
        let stringFields = false
        let royalty1 = false
        let royalty2 = false

        if(form.name.length > 0 && form.parent.length > 0 && form.parentRef.length > 0) {
            stringFields = true
        } else {
            stringFields = false
        }

        if(/^\d+$/.test( form.royalty ) && +form.royalty > 0 && +form.royalty < 101) {
            royalty1 = true
        } else {
            royalty1 = false
        }

        if(/^\d+$/.test( form.addSvcRoyalty ) && + form.addSvcRoyalty > 0 && + form.addSvcRoyalty < 101) {
            royalty2 = true
        } else {
            royalty2 = false
        }

        if(stringFields && royalty1 && royalty2) {
            return true
        } else {
            return false
        }
    }

    formUserValidator(form: User) {
        if(form.name.length > 0 && form.phone.length === 10 && form.cell.length === 10 && this.validateEmail(form.email)) {
            if(form.role == 'vendor' && form.companyName.length < 1) {
                return false
            }
            return true
        } else {
            return false
        }
    }

    formBillingValidator(form: Billing) {
        let stringFields = false
        let zip = false
        let ccNumber = false
        let csv = false
        let validExpDate = false

        if(form.addressl1.length > 0 && 
            form.city.length > 0 && 
            form.state.length > 0 &&
            form.ccName.length > 0 &&
            form.ccAgreement) {
            stringFields = true
        } else {
            stringFields = false
        }

        if(/^\d+$/.test( form.ccNumber ) && +form.ccNumber > 1000000000000000 && + form.ccNumber <= 10000000000000000) {
            ccNumber = true
        } else {
            ccNumber = false
        }

        if(/^\d+$/.test( form.zip ) && + form.zip > 999 && + form.zip < 100000) {
            zip = true
        } else {
            zip = false
        }

        if(/^\d+$/.test( form.ccCsv ) && + form.ccCsv > 99 && + form.ccCsv < 10000) {
            csv = true
        } else {
            csv = false
        }

        validExpDate = this.ccExpDateValidator(form)

        if(stringFields && ccNumber && zip && csv && validExpDate) {
            return true
        } else {
            return false
        }
    }

    ccExpDateValidator(form: Billing) {
        let expMonth = false
        let expYear = false

        const d = new Date()
        let month = (d.getMonth() + 1).toString()
        const year = d.getFullYear().toString()

        if(/^\d+$/.test( form.ccExpMonth ) && + form.ccExpMonth >= 1 && + form.ccExpMonth <= 12) {
            expMonth = true
        } else {
            expMonth = false
        }

        if(/^\d+$/.test( form.ccExpYear ) && + form.ccExpYear >= 2020 && + form.ccExpYear <= 2099) {
            expYear = true
        } else {
            expYear = false
        }

        if(expMonth && expYear) {
            if(+month < 10) {
                month = "0"+ month
            }

            if(parseInt(form.ccExpYear + form.ccExpMonth) >= parseInt(year+month)) {
                return true
            } else {
                return false
            }
        }
    }

    validateEmail = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
      
        return expression.test(String(email).toLowerCase())
    }

}