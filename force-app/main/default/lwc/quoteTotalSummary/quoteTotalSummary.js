import { LightningElement } from "lwc";

export default class QuoteTotalSummary extends LightningElement {


handleAdjustAmt(){
        this.dispatchEvent(new CustomEvent("openmodal"));
      
} 

}
