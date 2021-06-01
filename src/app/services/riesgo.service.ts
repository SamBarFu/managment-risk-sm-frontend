import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AuthenticationService } from './authentication.service';
const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class RiesgoService {

  constructor(private _login:AuthenticationService, private http:HttpClient) { }

  postRiesgo(form:any){
    const h = new HttpHeaders().set('authorization', this._login.token).set('Content-Type', 'application/json');
    let y={
        "name"            : form.name,
        "description"     : form.description,
        "impactId"        : form.impactId,
        "probabilityId"   : form.probabilityId,
        "organizationId"  : this._login.user.organizationId,
    }
    let x=JSON.stringify(y);
    return this.http.post(`${apiUrl}/api/v1/organization/risk`,x, { headers: h });
  }
  getRiesgos(){
    return this.http.get(`${apiUrl}/api/v1/organization/${this._login.user.id}/risks`);
  }
  getProbabilidadImpacto(){
    return this.http.get(`${apiUrl}/api/v1/organization/${this._login.user.id}/parametization/`);
  }
  putRiesgo(data:any,id:any){
    let dato={
      "name": data.name,
      "description": data.description,
      "impactId": parseInt(data.impactId) ,
      "probabilityId": parseInt(data.probabilityId),
    }

    console.log(dato)
    return this.http.put(`${apiUrl}/api/v1/organization/risk/${id}/`,dato);
  }
}
