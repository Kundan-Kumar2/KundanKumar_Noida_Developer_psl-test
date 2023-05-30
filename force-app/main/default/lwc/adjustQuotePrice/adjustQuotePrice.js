import { LightningElement, api } from "lwc";

export default class AdjustQuotePrice extends LightningElement {
  adjustedAmountLabel = "Adjusted Amount";
  adjustedAmount = 0;
  @api showAdjustDialog = false

  amountChangeHandler(event){
    this.adjustedAmount = event.target.value
  }

  closeModal(event){
    this.showAdjustDialog = false
    const {label} = event.target
    const evt = new CustomEvent('updateamount', {detail: {
      amount:this.adjustedAmount,
      action: label
    }})
    this.dispatchEvent(evt)
  }
}