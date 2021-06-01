import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from 'app/login/login.component';
import { AuthGuard } from 'app/helpers/auth.guard';
import { LoginGuard } from 'app/helpers/login.guard';
import { RegistrarComponent } from './registrar/registrar.component';
import { OrganizacionComponent } from './organizacion/organizacion.component';

const routes: Routes =[
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'registrar',
    component: RegistrarComponent,
  },
  {
    path: 'organizacion',
    component: OrganizacionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule',
      canActivate: [AuthGuard]
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
