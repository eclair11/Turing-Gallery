import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  constructor(private httpClient: HttpClient) { }


  // authenticate() {

  //   return this.httpClient.post<any>('http://localhost:8080/authenticate', { email, pass }).pipe(
  //     map(
  //       userData => {
  //         sessionStorage.setItem('email', email);
  //         let tokenStr = 'Bearer ' + userData.token;
  //         sessionStorage.setItem('token', tokenStr);
  //         return userData;
  //       }
  //     )
  //   );
  // }

}
