import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { CarritoComponent } from './paginas/carrito/carrito.component';

const routes: Routes =
[
  {path: '', redirectTo:'/inicio',pathMatch:'full'},
  {path: 'inicio',component:InicioComponent},
  {path: 'carrito',component:CarritoComponent},
  {path:'**',redirectTo:'/inicio',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
