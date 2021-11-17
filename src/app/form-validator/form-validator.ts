import { Injectable } from '@angular/core';

@Injectable()
export class FormValidator {

    stringValidator(value: string, required?: boolean, minLength?: number, maxLength?: number) {
        if(required && value === '') {
            return { valid: false, message: "Form Rule: Field empty" }
        }
        if(minLength > 0) {
            if(value.length < minLength) {
                return { valid: false, message: "Form Rule: Minimum Length" }
            }
        }
        if(maxLength > 0) {
            if(value.length > maxLength) {
                return { valid: false, message: "Form Rule: Maximum Length" }
            }
        }
        return { valid: true , message: "Field Valid"}
    }

    phoneValidator(value: string) {
        const expression = /^\d{10}$/

        return expression.test(String(value).toLowerCase()) ? {valid: true , message: "Valid phone number"} : {valid: false, message: "Form Rule: phone not valid"}
    }

    emailValidator(value: string,) {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
      
        return expression.test(String(value).toLowerCase()) ? {valid: true , message: "Valid email"} : {valid: false, message: "Form Rule: Email not valid"}
    }

    cCardNumberValidator(value: string) {
        value = value.toLowerCase()
        const americanExpress = /^(?:3[47][0-9]{13})$/
        const visa = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/
        const masterCard = /^(?:5[1-5][0-9]{14})$/
        const discover = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/

        return americanExpress.test(value) || visa.test(value) || masterCard.test(value) || discover.test(value) ?
                    {valid: true , message: "Valid Credit Card"} : 
                    {valid: false, message: "Form Rule: Credit Card number not valid"}
    }

    dateValidator(value:string) {

    }

    ccExpDateValidator(ccExpMonth: string, ccExpYear: string) {
        let expMonth = false
        let expYear = false

        const d = new Date()
        let month = (d.getMonth() + 1).toString()
        const year = d.getFullYear().toString()

        if(/^\d+$/.test( ccExpMonth ) && +ccExpMonth >= 1 && + ccExpMonth <= 12) {
            expMonth = true
        } else {
            expMonth = false
        }

        if(/^\d+$/.test( ccExpYear ) && + ccExpYear >= 2020 && + ccExpYear <= 2099) {
            expYear = true
        } else {
            expYear = false
        }

        if(expMonth && expYear) {
            if(+month < 10) {
                month = "0"+ month
            }

            if(parseInt(ccExpYear + ccExpMonth) >= parseInt(year+month)) {
                return { valid: true , message: "valid Expiration Date" }
            } else {
                return { valid: false , message: "Form Rule: Expiration Date not valid" }
            }
        }
    }

}