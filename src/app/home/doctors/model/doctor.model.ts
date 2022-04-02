import { Address } from "src/app/shared/address.model";

export class Doctor{

    constructor(
        public firstName: string,
        public lastName: string,
        public address: Address,
        public id: string,
        public specializations: {name: string}[]
    ){};

}