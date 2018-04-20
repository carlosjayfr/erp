import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ComprasComponent } from './compras/compras.component';
import { ListadoProvComponent } from './proveedores/listado-prov/listado-prov.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { ProveedoresService } from './servicios/proveedores.service';
import { CrearProvComponent } from './proveedores/crear-prov/crear-prov.component';
import { EditarProvComponent } from './proveedores/editar-prov/editar-prov.component';
import { ListadoFacComponent } from './facturas/listado-fac/listado-fac.component';
import { FacturasService } from './servicios/facturas.service';
import { CrearFacComponent } from './facturas/crear-fac/crear-fac.component';
import { EditarFacComponent } from './facturas/editar-fac/editar-fac.component';
import { RegistroComponent } from './autenticacion/registro/registro.component';
import { AutenticacionService } from './servicios/autenticacion.service';
import { LoginComponent } from './autenticacion/login/login.component';
import { ListadoClieComponent } from './clientes/listado-clie/listado-clie.component';
import { AutenticacionGuard } from './servicios/autenticacion.guard';
import { ListadoUsuariosComponent } from './autenticacion/listado-usuarios/listado-usuarios.component';


const rutas: Routes=[
  {path: '', component: InicioComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'inicio-sesion', component: LoginComponent},
  {path: 'listado-usuarios', component: ListadoUsuariosComponent, canActivate: [AutenticacionGuard]},
  {path: 'compras', component: ComprasComponent, canActivate: [AutenticacionGuard]},
  {path: 'Listado-proveedores', component: ListadoProvComponent, canActivate: [AutenticacionGuard]},
  {path: 'crear-proveedor', component: CrearProvComponent, canActivate: [AutenticacionGuard]},
  {path: 'editar-proveedor/:id', component: EditarProvComponent, canActivate: [AutenticacionGuard]}, //Ademas va a recibir un id
  {path: 'listado-facturas', component: ListadoFacComponent, canActivate: [AutenticacionGuard]},
  {path: 'crear-factura', component: CrearFacComponent, canActivate: [AutenticacionGuard]},
  {path: 'editar-factura/:id', component: EditarFacComponent, canActivate: [AutenticacionGuard]},
  {path: 'listado-clientes', component: ListadoClieComponent, canActivate: [AutenticacionGuard]},
  {path: '**', component: InicioComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ComprasComponent,
    ListadoProvComponent,
    CabeceraComponent,
    CrearProvComponent,
    EditarProvComponent,
    ListadoFacComponent,
    CrearFacComponent,
    EditarFacComponent,
    RegistroComponent,
    LoginComponent,
    ListadoClieComponent,
    ListadoUsuariosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [ProveedoresService,FacturasService, AutenticacionService, AutenticacionGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
