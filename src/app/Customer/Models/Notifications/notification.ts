export class Notification {
    to : string ;
    message : string ;
    read : boolean 


    constructor( to : string ,message : string , read : boolean ) {
        this.to = to 
        this.message = message;
        this.read = read
    }
}
