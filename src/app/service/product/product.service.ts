import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.baseUrl;
  imageUrl = 'http://localhost:8001/api/v1/product-image';

  constructor(private http:HttpClient) { }

  create(obj:any):Observable<any>{
    return this.http.post(this.baseUrl+'products',{
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
    return this.http.get(this.baseUrl+'products'+"/list",{params});
  }

  delete(id:string){
    return this.http.delete(this.baseUrl+'products'+"/"+id);
  }

  update(obj:any, id:any):Observable<any>{
    return this.http.put(this.baseUrl+'products'+"/"+id,{
      qty:obj.qty,
      unitPrice:obj.unitPrice,
      description:obj.description
    })
  }

  productImageUpload(data:FormData, productId:any){
    return this.http.post(this.baseUrl+'product-image'+'/'+productId,data);
  }

}
