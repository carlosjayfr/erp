import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';

@Injectable()
export class SesionesService {

  constructor(private http: HttpClient,
              private router: Router) { }


    getSesiones(nombre){
  
      let url = 'http://localhost:3000/sesion?nombre='+nombre;
      return this.http.get(url)
                      .map((resp:any)=>{
                        return resp;
                      });
  
    }
  
    postSesion(sesion){
      let url = "http://localhost:3000/sesion";
      return this.http.post(url,sesion)
                      .map((resp:any)=>{
                        return resp;
                      });
  
    }
}
