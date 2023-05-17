import { LightningElement, api, track } from 'lwc'; 
import { ShowToastEvent } from 'lightning/platformShowToastEvent' 
import updateAmount from '@salesforce/apex/QuoteDto.updateAmount'; 
import LightningModal from 'lightning/modal';
 
export default class AdjustQuotePrice extends LightningElement { 
  @api recordId;
  @api adjustedAmount;
  @track amount;
  
  adjustedAmountLabel = "Adjusted Amount";
  adjustedAmount =0;
   

  Amountchangehandler(event){ 
   this.adjustedAmount = event.target.value;
   console.log('15 this.adjustedAmount', this.adjustedAmount)
  } 
  
  
    handlecancelClick(){
    this.dispatchEvent(new CustomEvent('close'));
    }

   closeModal() {
    this.AdjustedAmount = '';
    this.dialogClass = '';

   }
  
   handleSaveClick(event) {
    console.log('20 this.adjustedAmount', this.adjustedAmount);
    updateAmount({ adjustedAmount: this.AdjustedAmount })
       .then(result => {
          console.log('result23 ', result);
          this.showMessage('SAVED', 'adjustedAmount Updated', 'success')
       })
       .catch(error => {
           this.showErrorToast('An error occurred while updating quote amount');
           console.error('25 error', error);
       });
   }
   adjustedAmountHandler(){
    console.log('inside in adjustedAmountHandler');
   }

  /*showSuccessToast(message) {
    const event = new ShowToastEvent({
      title: 'Success',
      message: message,
      variant: 'success',
  });
  this.dispatchEvent(event);
  }*/

  connectedCallback() {
    this.dialogClass = 'slds-modal slds-fade-in-open';
  }

  get backdropClass() {
    return this.dialogClass ? 'slds-backdrop slds-backdrop_open' : 'slds-backdrop';
  }

}