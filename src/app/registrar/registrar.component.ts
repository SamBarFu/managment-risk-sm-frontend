import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  registroForm: FormGroup;
  submitted=false;
  error=false;
  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService,private router: Router) { }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName  : ['', Validators.required],
      email     : ['', Validators.required],
      password  : ['', Validators.required],
    });
  }

  get f() { 
    return this.registroForm.controls; 
  }
  guardar() {
    this.submitted = true;
    if (this.registroForm.invalid) {
      return;
    }
    this.authenticationService.registrar(this.registroForm.value)
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          console.log('Este es el error', error);
        });
  }
    salir(){
      this.router.navigate(['/login']);
    }
}

