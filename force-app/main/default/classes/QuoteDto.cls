public with sharing class QuoteDto extends BaseDto {
  public Date endDate;

  public QuoteDto() {
  }

  public QuoteDto(Quote__c quote) {
    super(quote);
    this.endDate = quote.EndDate__c;
  }

  public override SObject refreshSo() {
    return null;
  }
}