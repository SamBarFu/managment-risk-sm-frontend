import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizacionService } from 'app/services/organizacion.service';
import { data } from 'jquery';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    organizacion:FormGroup;
    datos:any;
    submitted=false;
    constructor(private formBuilder: FormBuilder, private _organizacion:OrganizacionService) {
        
     }

    ngOnInit() {
        this.cargar();
    }
    async cargar(){
        this.datos=await this._organizacion.getOrganizacion().toPromise().then(data=>{
            return data;
        })
        this.crearFormulario();
        this.organizacion.get('organizationName').setValue(this.datos.organizationName);
        this.organizacion.get('address').setValue(this.datos.address);
        this.organizacion.get('industry').setValue(this.datos.industry);
        this.organizacion.get('mission').setValue(this.datos.mission);
        this.organizacion.get('vision').setValue(this.datos.vision);
        this.organizacion.get('contactNumber').setValue(this.datos.contactNumber);
    }
    crearFormulario(){
        this.organizacion = this.formBuilder.group({
            organizationName    : ['', Validators.required],
            address             : ['', Validators.required],
            industry            : ['', Validators.required],
            mission             : ['', Validators.required],
            vision              : ['', Validators.required],
            contactNumber       : ['', Validators.required],
        });
    }
    get f() { 
        return this.organizacion.controls; 
      }
    actualizar(){
        this.submitted = true;
        if (this.organizacion.invalid) {
            console.log(this.organizacion .value);
            return;
        }
        this._organizacion.putOrganizacion(this.organizacion.value).subscribe((data:any)=>{
            console.log(data);
        })
    }
}
