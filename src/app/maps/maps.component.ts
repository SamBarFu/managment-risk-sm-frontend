import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizacionService } from 'app/services/organizacion.service';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
    organizacion:FormGroup;
    submitted=false;
    constructor(private formBuilder: FormBuilder, private _organizacion:OrganizacionService) { }

    ngOnInit() {
        this.crearFormulario();
    }
    

    get f() { 
        return this.organizacion.controls; 
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
 
    guardar(){
        console.log("dfsdfsdf");
        this.submitted = true;
        if (this.organizacion.invalid) {
            console.log(this.organizacion .value);
            return;
        }
        this._organizacion.postOrganizacion(this.organizacion .value).subscribe((data:any)=>{
            console.log(data);
        })
    }

}
