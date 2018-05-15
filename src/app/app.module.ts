import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ComprasComponent } from './compras/compras.component';
import { VentasComponent } from './ventas/ventas.component';
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
import { ListadoClientesComponent } from './clientes/listado-clientes/listado-clientes.component';
import { CrearClientesComponent } from './clientes/crear-clientes/crear-clientes.component';
import { EditarClientesComponent } from './clientes/editar-clientes/editar-clientes.component';
import { CrearPresComponent } from './presupuestos/crear-pres/crear-pres.component';
import { EditarPresComponent } from './presupuestos/editar-pres/editar-pres.component';
import { ListadoPresComponent } from './presupuestos/listado-pres/listado-pres.component';
import { AutenticacionGuard } from './servicios/autenticacion.guard';
import { ListadoUsuariosComponent } from './autenticacion/listado-usuarios/listado-usuarios.component';
import { SesionesComponent } from './autenticacion/sesiones/sesiones.component';
import { SesionesService } from './servicios/sesiones.service';
import { PresupuestosService } from './servicios/presupuestos.service';
import { ClientesService } from './servicios/clientes.service';
import { CrearArticuloComponent } from './articulos/crear-articulo/crear-articulo.component';
import { ListadoArticulosComponent } from './articulos/listado-articulos/listado-articulos.component';
import { ArticulosService } from './servicios/articulos.service';



const rutas: Routes=[
  {path: '', component: InicioComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'inicio-sesion', component: LoginComponent},
  {path: 'listado-usuarios', component: ListadoUsuariosComponent, canActivate: [AutenticacionGuard]},
  {path: 'compras', component: ComprasComponent, canActivate: [AutenticacionGuard]},
  {path: 'ventas', component: VentasComponent, canActivate: [AutenticacionGuard]},
  {path: 'Listado-proveedores', component: ListadoProvComponent, canActivate: [AutenticacionGuard]},
  {path: 'listado-sesiones/:nombre', component: SesionesComponent, canActivate: [AutenticacionGuard]},
  {path: 'crear-proveedor', component: CrearProvComponent, canActivate: [AutenticacionGuard]},
  {path: 'editar-proveedor/:id', component: EditarProvComponent, canActivate: [AutenticacionGuard]}, //Ademas va a recibir un id
  {path: 'listado-facturas', component: ListadoFacComponent, canActivate: [AutenticacionGuard]},
  {path: 'crear-factura', component: CrearFacComponent, canActivate: [AutenticacionGuard]},
  {path: 'editar-factura/:id', component: EditarFacComponent, canActivate: [AutenticacionGuard]},
  {path: 'listado-clientes', component: ListadoClientesComponent, canActivate: [AutenticacionGuard]},
  {path: 'crear-cliente', component: CrearClientesComponent, canActivate: [AutenticacionGuard]},
  {path: 'editar-cliente/:id', component: EditarClientesComponent, canActivate: [AutenticacionGuard]},
  {path: 'listado-presupuestos', component: ListadoPresComponent, canActivate: [AutenticacionGuard]},
  {path: 'crear-presupuesto', component: CrearPresComponent, canActivate: [AutenticacionGuard]},
  {path: 'editar-presupuesto/:id', component: EditarPresComponent, canActivate: [AutenticacionGuard]},
  {path: 'crear-articulo', component: CrearArticuloComponent, canActivate: [AutenticacionGuard]},
  {path: 'listado-articulos', component: ListadoArticulosComponent, canActivate: [AutenticacionGuard]},
  {path: '**', component: InicioComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ComprasComponent,
    VentasComponent,
    ListadoProvComponent,
    CabeceraComponent,
    CrearProvComponent,
    EditarProvComponent,
    ListadoFacComponent,
    CrearFacComponent,
    EditarFacComponent,
    RegistroComponent,
    LoginComponent,
    ListadoClientesComponent,
    CrearClientesComponent,
    EditarClientesComponent,
    ListadoPresComponent,
    CrearClientesComponent,
    EditarClientesComponent,
    ListadoUsuariosComponent,
    ListadoPresComponent,
    CrearPresComponent,
    EditarPresComponent,
    SesionesComponent,
    CrearArticuloComponent,
    ListadoArticulosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [ProveedoresService,FacturasService, AutenticacionService, AutenticacionGuard,SesionesService,PresupuestosService,ClientesService, ArticulosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
