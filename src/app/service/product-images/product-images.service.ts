import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductImagesService {

  baseUrl = "http://localhost:8001/api/v1/product_image";

  constructor(private http:HttpClient) { }

  create(file:any,id:any):Observable<any>{
    const formData = new FormData();
    formData.append('productImage', file);
    return this.http.post(this.baseUrl+"/"+id,formData);
  }

}
