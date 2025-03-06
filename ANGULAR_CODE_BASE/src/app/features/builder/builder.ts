export interface Builder {
    id:any,
    fname: string,
    lname:string,
    email:string,
    pincode:string,
    location:string,
    password:string,
  photoPath:string,
    state: {
        _id:string;
        name: string;
      };
    city: {
        _id:string;
        name: string;
      };

    phoneNo:string,
}  