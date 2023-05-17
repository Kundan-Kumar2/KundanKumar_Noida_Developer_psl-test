import { LightningElement } from "lwc";

export default class QuoteTotalSummary extends LightningElement {

    OpenModal()
    {
    this.dispatchEvent(new CustomEvent('Buttonclick'));
    }
}