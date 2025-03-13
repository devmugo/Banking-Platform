export class Customer {
    
    firstName : string
    lastName : string 
    gender : string 
    dateOfBirth : string 
    email: string 
    phone : string 
    address: string 
    nextOfKin : string 
    nationalId: string 
    nextofkincontact: string

    constructor( firstName : string, lastName : string,gender : string, 
        dateOfBirth : string , email: string , phone : string, address: string, 
        nextOfKin : string,nationalId: string , nextofkincontact:string ){           
            this.firstName  = firstName 
            this.lastName = lastName 
            this.gender = gender 
            this.dateOfBirth = dateOfBirth 
            this.email= email 
            this.phone = phone 
            this.address  = address 
            this.nextOfKin = nextOfKin 
            this.nationalId = nationalId
            this.nextofkincontact = nextofkincontact

        }
    



}
