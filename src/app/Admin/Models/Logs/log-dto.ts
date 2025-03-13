export class LogDTO {
    
    activity : string 
    date : string 
    performedBy : string 


    constructor ( 
        activity : string ,
        date : string ,
        performedBy : string ) {
            this.activity = activity
            this.date = date            
            this.performedBy = performedBy
        }
}
