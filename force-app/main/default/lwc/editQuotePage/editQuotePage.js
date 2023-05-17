import { LightningElement, api, track } from "lwc";
import saveValues from '@salesforce/apex/QuoteDto.saveValues'; 
import { ShowToastEvent } from 'lightning/platformShowToastEvent'; 
export default class EditQuotePage extends LightningElement {
 // @api recordId;
  @api recordId;
  isVisible=false;
  
  @api amount;
  @track newValue1; 
  @track newValue2;

  handleAdjustButtonClick(){
    //Logic to handle the Adjust Button Click
    this.isVisible=!this.isVisible;
  }

  // @track newrecordId; 
  changeHandlerEvent(event) { 
     
    console.log('Inside in changeHandlerevt'); 
     
    // this.newrecordId = event.detail.recordId; 
    this.newValue1 = event.detail.input1; 
    this.newValue2 = event.detail.input2; 
 
    // console.log('  this.newrecordId  ', this.newrecordId); 
    console.log('   this.newValue1  ', this.newValue1); 
    console.log('  this.newValue2  ', this.newValue2); 
 
  }
  
  saveHandler(event) { 
    console.log(' inside in handleClick editQuote'); 
    saveValues({ sDate: this.newValue1, eDate: this.newValue2 }) 
      .then(result => { 
        console.log('Result 34 ', result); 
        this.showMessage('SAVED', 'Saved Quote Details', 'success') 
      }) 
      .catch(error => { 
        console.error('Error: 37 ', error); 
        this.showMessage('Error', 'Couldnot Update Quote, Contact Admin', 'error') 
      }); 
  }
  showMessage(title, message, variant) { 
    this.dispatchEvent( 
      new ShowToastEvent({ 
        title, message, variant 
      }) 
    ); 
  } 
}
