import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { OrganizacionService } from 'app/services/organizacion.service';
@Component({
  selector: 'app-organizacion',
  templateUrl: './organizacion.component.html',
  styleUrls: ['./organizacion.component.css']
})
export class OrganizacionComponent implements OnInit {

  organizacion:FormGroup;
    submitted=false;
    constructor(private formBuilder: FormBuilder, private _organizacion:OrganizacionService,private router: Router, private _login: AuthenticationService) { }

    ngOnInit() {
        this.crearFormulario();
    }
    

    get f() { 
        return this.organizacion.controls; 
      }
    crearFormulario(){
        this.organizacion = this.formBuilder.group({
            organizationName    : ['', Validators.required],
            address             : ['', [Validators.required,Validators.email]],
            industry            : ['', Validators.required],
            mission             : ['', Validators.required],
            vision              : ['', Validators.required],
            contactNumber       : ['', [Validators.required,Validators.maxLength(12),Validators.minLength(8)]],
        });
    }
 
    guardar(){
        this.submitted = true;
        if (this.organizacion.invalid) {
            console.log(this.organizacion .value);
            return;
        }
        this._organizacion.postOrganizacion(this.organizacion.value).subscribe((data:any)=>{
            console.log(data);
            console.log(data.organizationId);
            let x=this._login.user;
            x.organizationId=data.data.organizationId;
            console.log(x);
            localStorage.setItem('currentUser', JSON.stringify(x));
            this.router.navigate(['/']);
            console.log(data);
        })
    }

}
