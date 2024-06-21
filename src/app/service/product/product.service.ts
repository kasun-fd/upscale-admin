import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:8001/api/v1/products";

  constructor(private http:HttpClient) { }

  create(obj:any):Observable<any>{
    return this.http.post(this.baseUrl,{
      qty:obj.qty,
      unitPrice:obj.unitPrice,
      description:obj.description
    })
  }

  getAll(searchText:any,page:any,size:any):Observable<any>{
    // const url = `${this.baseUrl}/list?searchText=${searchText}&page=${page}&size=${size}`;
    let params = new HttpParams();
    params = params.append('searchText',searchText)
    params = params.append('page',page)
    params = params.append('size',size)
    return this.http.get(this.baseUrl+"/list",{params});
  }

  delete(id:string){

  }

}
