import { LightningElement, api, track } from 'lwc'; 
import { ShowToastEvent } from 'lightning/platformShowToastEvent' 
import updateAmount from '@salesforce/apex/QuoteDto.updateAmount'; 
import LightningModal from 'lightning/modal';
 
export default class AdjustQuotePrice extends LightningElement { 
  @api recordId;
 // @api quoteId or  @api objectApiId;
  @track dialogClass = '';
  @track adjustedAmount;
  @api amount;
  adjustedAmountLabel = "Adjusted Amount";
  adjustedAmount =0;
   

  amountchangehandler(event){ 
   this.adjustedAmount = event.target.value;
   console.log(' 15 this.adjustedAmount', this.adjustedAmount);
  } 
  
  
  handlecancelClick(){
  this.dispatchEvent(new CustomEvent('close'));
  }

  closeModal() {
    this.AdjustedAmount = '';
    this.dialogClass = '';
  }
  
  handleSaveClick(event) {
   console.log(' 20 this.adjustedAmount', this.adjustedAmount);
    updateAmount({ amount: this.adjustedAmount })
       .then(result => {
          console.log('result23 ', result);
          this.showSuccessToast('Adjusted amount updated successfully.');
        this.dispatchEvent(new CustomEvent('close'));
      })
      .catch(error => {
        console.error('Error:', error);
        this.showErrorToast('An error occurred while updating the quote amount.');
      });
   }

   showSuccessToast(message) {
    const event = new ShowToastEvent({
      title: 'Success',
      message: message,
      variant: 'success'
    });
    this.dispatchEvent(event);
  }

  showErrorToast(message) {
    const event = new ShowToastEvent({
      title: 'Error',
      message: message,
      variant: 'error'
    });
    this.dispatchEvent(event);
  }

  /* adjustedAmountHandler(){
    console.log('inside in adjustedAmountHandler');
   }*/

  connectedCallback() {
    this.dialogClass = 'slds-modal slds-fade-in-open';
  }

  get backdropClass() {
    return this.dialogClass ? 'slds-backdrop slds-backdrop_open' : 'slds-backdrop';
  }

}