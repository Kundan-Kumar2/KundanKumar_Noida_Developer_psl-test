public with sharing class QuoteObjectHandler {

  /*
  * @Method:      getQuoteObjectDetails
  * @Created by:  Kundan Kumar
  * @Description: Method return QuoteObj Details 
  * @Param:       String quoteId
  * @Return:      QuoteDto which can be used by LWC
  */
    @AuraEnabled(Cacheable=true)
    public static QuoteDto getQuoteDetails(String quoteId){
      QuoteDto quoteDTOObj = null;
      try {
          if(Schema.sObjectType.Quote__c.IsAccessible()){
    
          Quote__c qObj =  [SELECT Id,name , StartDate__c , EndDate__c , TotalQuotedAmount__c
                            FROM   QUOTE__c
                            WHERE Id=: quoteId
                            WITH SECURITY_ENFORCED];
          
          quoteDTOObj = new QuoteDto(qObj);
       }
          
       } catch (Exception e) {
          throw new AuraHandledException(e.getMessage());
       }
         return quoteDTOObj;
    }
    
      @AuraEnabled
      public static Id updateQuoteData (Date startDate, Date endDate, string recId){
          Quote__c quote =[SELECT Id, StartDate__c, EndDate__c, TotalQuotedAmount__c FROM Quote__c Where Id=:recId WITH SECURITY_ENFORCED ORDER BY CreatedDate Desc LIMIT 1];
          System.debug('quote rec'+quote);
          if(quote != null){
              quote.startDate__c = startDate;
              quote.EndDate__c =endDate;
              
              update quote;
              
              return quote.Id;
          }
          return null;
      }
     
      @AuraEnabled
      public static void updateAmount(Decimal amount, String recId) {
      List<Quote__c> quotes = [SELECT Id, StartDate__c, EndDate__c, TotalQuotedAmount__c
                               FROM Quote__c
                               WHERE Id = :recId
                               ORDER BY CreatedDate DESC
                               LIMIT 1];
  
      if (quotes.size() > 0) {
          Quote__c quote = quotes[0];
          quote.TotalQuotedAmount__c = amount;
          update quote;
          System.debug('quote ' + quote);
       } 
    }
  }
