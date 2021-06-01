import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'app/services/authentication.service';
import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted=false;
  error=false;
  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService,private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { 
    return this.loginForm.controls; 
  }
  modal(){  
    $('#mymodal').modal('show');
  }


  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authenticationService.login(this.loginForm.get('email').value,this.loginForm.get('password').value)
      .subscribe(
        data => {
          console.log(data);
          if(data.organizationId){
            this.router.navigate(['/user-profile']);
          }else{
            this.router.navigate(['/organizacion']);
          }
        },
        error => {
          console.log('Este es el error', error);
          if(error.error.status==400){
            this.error=true;
          }

        });
  }
  registrar(){
    this.router.navigate(['/registrar']);
  }
}
