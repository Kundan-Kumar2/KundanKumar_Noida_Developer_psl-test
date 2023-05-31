import { LightningElement, api, track} from "lwc";
import lightningModalLWC from 'c/adjustQuotePrice';
import updateAmount from "@salesforce/apex/QuoteObjectHandler.updateAmount";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class EditQuotePage extends LightningElement {
  @api recordId;
  @api objectApiId;
  @api quoteId;
  
  @track showModal=false;
  adjustedAmount =0;
  
  handleOpenModal(){
    this.showModal = true;
  }
  
  // quote object to hold the changed data
  quoteData = {
    Id: "",
    TotalQuotedAmount__c: ''
  };

  async handleUpdateAmount(event){
    const{amount, action} =event.detail;
    this.adjustedAmount =amount;

    if(action == "Save"){
      console.log("saving adjusted amount:", this.adjustedAmount);

      //prepare the Qutoe data object with updated quoted amount

      this.quoteData.Id = this.recordId;
      this.quoteData.TotalQuotedAmount__c = this.adjustedAmount;

      try{
        //call the apex method to update the quote record
       // await updateAmount({quoteDTL: JSON.stringify(this.quoteData), operationType: 'update'});
        await updateAmount({amount: this.adjustedAmount, recId: this.recordId });
        console.log('this.recordId');
        //show success toast message
        this.showToast('Success', 'Quoted amount updated successfully.', 'success');
      }catch(error){
        //show error toast message
        this.showToast('Error', 'Failed to update Quoted amount.', 'error');
        console.log('Error:', error);
      }
    }

    this.showModal =false;
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
  
  


  
  /*handleUpdateAmount(event){
    const {amount, action } =event.detail;
    this.adjustedAmount =amount;

    if(action == "save"){
      console.log("Saving adjusted amount:", this.adjustedAmount);
      
      //show success toast message
      this.showToast('Success', 'Adjusted amount Saved Successfully,', 'Success');
    }
    this.showModal=false;
  }*/ 
  
