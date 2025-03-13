export class Log {
    logId : number
    activity : string 
    date : string 
    performedBy : string 


    constructor ( logId : number,
        activity : string ,
        date : string ,
        performedBy : string ) {
            this.activity = activity
            this.date = date
            this.logId = logId
            this.performedBy = performedBy
        }


}
