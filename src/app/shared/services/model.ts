import { Injectable } from "@angular/core";
@Injectable(
    {
        providedIn: 'root'
    }
)
export class Branch{
    id:number;
    title:String;
    address:String;
}