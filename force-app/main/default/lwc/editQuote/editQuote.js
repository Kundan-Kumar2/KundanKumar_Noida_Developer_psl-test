import { LightningElement, api, track } from "lwc"; 
import { ShowToastEvent } from 'lightning/platformShowToastEvent'; 
import saveValues from '@salesforce/apex/QuoteDto.saveValues'; 
import getQueRec from '@salesforce/apex/QuoteDto.getQueRec'; 
 
export default class EditQuote extends LightningElement { 
  
  @api recordId; 
  @api sDate; 
  @api eDate;
  @api amount; 
 
  @track quoteRecords; 
  @track error; 
  @track input1; 
  @track input2; 
 
 
  connectedCallback() { 
  //  $recordId 
    getQueRec({ recordId: 'a005i00000GK4n7AAD' }) 
  .then(result => { 
    this.quoteRecords = result; 
    console.log('19 this.quoteRecords ', this.quoteRecords); 
    this.error = undefined; 
  }) 
  .catch(error => { 
      this.error = error; 
      console.log('24 this.error ', this.error); 
    this.quoteRecords = undefined; 
  }) 
 
} 
 
 // @track input; 
   handleChangeinputs(event) {    
     event.preventDefault(); 
     if (event.target.name == 'input1') { 
       this.input1 = event.target.value;        
     } 
     if (event.target.name == 'input2') { 
       this.input2 = event.target.value; 
     } 
 
    const selectEvent = new CustomEvent('mycustomevent', { 
      detail: { input1: this.input1, input2: this.input2 } 
    }); 
    this.dispatchEvent(selectEvent); 
 
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
        this.showMessage('Error', 'Couldn\'t Update Quote, Contact Admin', 'error') 
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