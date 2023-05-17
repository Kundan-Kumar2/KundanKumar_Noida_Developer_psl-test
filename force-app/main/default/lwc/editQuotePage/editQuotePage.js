import { LightningElement, api, track } from "lwc";

import { ShowToastEvent } from 'lightning/platformShowToastEvent'; 
export default class EditQuotePage extends LightningElement {
  @api recordId;
  isVisible=false;

  
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
    console.log('   this.newValue1  ', this.newValue1 ); 
    console.log('  this.newValue2  ', this.newValue2); 
 
  } 
}
