import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class OrganizacionService {

  constructor(private _login:AuthenticationService,private http: HttpClient) { }

  getOrganizacion(){
    const h = new HttpHeaders().set('authorization', this._login.token).set('Content-Type', 'application/json');
    let id=this._login.user.organizationId;
    return this.http.get(`${apiUrl}/api/v1/organization/${id}`,{ headers: h }).pipe(map((data:any)=>{
      return data.data;
    }));
  }

  postOrganizacion(form:any){
    const h = new HttpHeaders().set('authorization', this._login.token).set('Content-Type', 'application/json');
    let y={
      "organizationName": form.organizationName,
      "address"         : form.address,
      "industry"        : form.industry,
      "mission"         : form.mission,
      "vision"          : form.vision,
      "contactNumber"   : form.contactNumber,
      "userId"          : this._login.user.id,
    }
    let x=JSON.stringify(y);
    console.log(x);
    return this.http.post(`${apiUrl}/api/v1/organization/`,x, { headers: h });
  }

  putOrganizacion(form:any){
    const h = new HttpHeaders().set('authorization', this._login.token).set('Content-Type', 'application/json');
    let y={
      "organizationName": form.organizationName,
      "address"         : form.address,
      "industry"        : form.industry,
      "mission"         : form.mission,
      "vision"          : form.vision,
      "contactNumber"   : form.contactNumber,
      "userId"          : this._login.user.id,
    }
    let x=JSON.stringify(y);
    console.log(x);
    return this.http.put(`${apiUrl}/api/v1/organization/${this._login.user.id}`,x, { headers: h });
  }
}
