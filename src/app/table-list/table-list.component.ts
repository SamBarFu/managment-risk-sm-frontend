import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RiesgoService } from 'app/services/riesgo.service';
declare var $;
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  riesgo:FormGroup;
  riesgosTotales:any;
  datos:any;
  submitted=false;
  riesgoPut:any;
  constructor(private formBuilder: FormBuilder, private _riesgo:RiesgoService) { }
  probabilidad:any;
  impacto:any;
  ngOnInit() {
   this.riesgos();
    this._riesgo.getProbabilidadImpacto().subscribe((data:any)=>{
      this.probabilidad=data.data.Probabilities;
      this.impacto=data.data.Impacts;
    })
    this.crearFormulario();
  }

  riesgos(){
    this._riesgo.getRiesgos().subscribe((data:any)=>{
      if(data.data){
        this.riesgosTotales=data.data;
      }
    })
  }

  modal(item){
    this.riesgoPut=item;
    $('#exampleModal').modal('show');
  }
  crearFormulario(){
    this.riesgo = this.formBuilder.group({
        name            : ['', Validators.required],
        description     : ['', Validators.required],
        impactId        : ['', Validators.required],
        probabilityId   : ['', Validators.required],
        organizationId  : [''],
    });
  }
  get f() { 
    return this.riesgo.controls; 
  }
  agregar(){
      this.submitted = true;
      if (this.riesgo.invalid) {
          console.log(this.riesgo .value);
          return;
      }
      this._riesgo.postRiesgo(this.riesgo.value).subscribe((data:any)=>{
        console.log(data);
      })
  }
  actualizarRiesgo(nombre,probabilidad,impacto,descripcion){
    console.log(impacto)
    let dato={
      "name": nombre,
      "description": descripcion,
      "impactId": impacto,
      "probabilityId": probabilidad,
    }
    this._riesgo.putRiesgo(dato,this.riesgoPut.id).subscribe((data:any)=>{
      $('#exampleModal').modal('toggle');
      this.riesgoPut=null;
      this.riesgos();
      
    })
  }

}
