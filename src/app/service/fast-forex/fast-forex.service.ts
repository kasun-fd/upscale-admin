import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class FastForexService{

  readonly http = inject(HttpClient);

  key = '39f66d90ce-2f84463265-sg3mlw';

  public exchange(from:any, to:any):Observable<any>{

    const options = {method: 'GET', headers: {accept: 'application/json'}};

    return this.http.get('https://api.fastforex.io/fetch-one?from=' + from + '&to=' + to + '&api_key=' + this.key, options);
  }

}
