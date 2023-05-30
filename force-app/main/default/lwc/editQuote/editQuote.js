import { LightningElement, api, wire, track } from "lwc";
import getQuote from '@salesforce/apex/QuoteObjectHandler.getQuoteDetails'
import updateQuote from '@salesforce/apex/QuoteObjectHandler.updateQuoteData'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { getFieldValue, getRecord } from "lightning/uiRecordApi";
import NAME_FIELD from "@salesforce/schema/Quote__c.Name";
import SD_FIELD from "@salesforce/schema/Quote__c.StartDate__c";
import ED_FIELD from "@salesforce/schema/Quote__c.EndDate__c";

export default class EditQuote extends LightningElement {

  @api recordId;
  @api objectApiName

  startDate;
  endDate;
  name;

  startdateChangeHandler(event) {
    this.startDate = event.target.value;
    console.log('this.startDate 27 ', this.startDate);
  }
  enddateChangeHandler(event) {
    this.endDate = event.target.value;
    console.log('this.endDate 32', this.endDate);
  }


  @wire(getRecord, {
    recordId: "$recordId",
    fields: [NAME_FIELD, SD_FIELD, ED_FIELD]
  })
  quoteRec;
  get qname() {
    return getFieldValue(this.quoteRec.data, NAME_FIELD);
  }
  get qstartDate() {
    return getFieldValue(this.quoteRec.data, SD_FIELD);
  }
  get qendDate() {
    return getFieldValue(this.quoteRec.data, ED_FIELD);
  }


    updateQuoteDates(event){
      console.log('Inside in handleSave');
      updateQuote({ startDate: this.startDate, endDate: this.endDate, recId: this.recordId })
      .then(updatedQuoteId => {
        if (updatedQuoteId) {
          this.showToast("Success", "Quote updated successfully.", "success");
          return refreshApex(this.Quote__c);
        } else {
          this.showToast("Error", "No quote record found.", "error");
        }
      })
      .catch(error => {
        this.showToast("Error", error.body.message, "error");
      });
    }
    showToast(title, message, variant) {
      const toastEvent = new ShowToastEvent({
        title,
        message,
        variant
      });
      this.dispatchEvent(toastEvent);
    }
  
}