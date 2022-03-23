import { Address } from "src/app/shared/address.model";

export class Patient{
    
    constructor(
        public firstName: string,
        public lastName: string,
        public address: Address,
        public pesel: string
    ){}

}