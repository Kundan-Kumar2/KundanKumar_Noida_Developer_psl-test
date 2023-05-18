public with sharing class QuoteDto extends BaseDto {
  public Date endDate;
  public Date startDate;

  public QuoteDto() {
  }

  public QuoteDto(Quote__c quote) {
    super(quote);
    this.endDate = quote.EndDate__c;
    this.startDate =quote.startDate__c;
  }

  public override SObject refreshSo() {
    return null;
  }
    
    //Fetch Data from Database on recordpage
    @AuraEnabled(cacheable=true)
    public static List<Quote__C> getQueRec(String recordId){
        List<Quote__C> queRec = [Select Id, StartDate__c, EndDate__C from Quote__C Where Id =: 'a005i00000GK4n7AAD' ];
        system.debug('queRec' +queRec);
        return queRec;
    }
    //Fetch Data from DataBase on recordPage
    @AuraEnabled
    public static Quote__c updateAmount(Integer amount){
        List<Quote__C> queRec =[Select Id, StartDate__C, EndDate__C, TotalQuotedAmount__c from Quote__C Where Id =: 'a005i00000GK4n7AAD' LIMIT 1];
      // if (!queRec.isEmpty()) {
        queRec[0].TotalQuotedAmount__C =amount;
        update queRec;
        system.debug ('queRec' +queRec);
        return queRec[0];
       //}
        //return null;
    
    }
    @AuraEnabled
    public static void saveValues (Date sDate, Date eDate){
        if(sDate !=null && eDate !=null){
            Quote__c queRec= [Select Id, StartDate__c, EndDate__C from Quote__C Where Id =: 'a005i00000GK4n7AAD'  limit 1];
            queRec.startDate__C = sDate;
            queRec.EndDate__c = eDate;
            update queRec;
            system.debug('queRec' +queRec);
            
       }
    }    
}
