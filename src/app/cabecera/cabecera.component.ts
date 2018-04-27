import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { SesionesService } from '../servicios/sesiones.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  sesion:any;
  nombre:string;

  constructor(private autenticacionService: AutenticacionService,
              private sesionService: SesionesService) { }

  ngOnInit() {
  }

  getLogged(){
    return this.autenticacionService.isLogged();
  }

  crearSesion(){
    this.sesion = {
      nombre: this.autenticacionService.nombre,
      logout: new Date(),
    }
    this.sesionService.postSesion(this.sesion)
                      .subscribe((resp:any)=>{
                        console.log(resp);
                      },error=>{
                        console.log(error);
                      })
  }

  getNombre(){
    this.nombre=this.autenticacionService.nombre;
    return this.nombre;
  }

}
