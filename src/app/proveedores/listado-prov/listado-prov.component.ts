import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-listado-prov',
  templateUrl: './listado-prov.component.html',
  styleUrls: ['./listado-prov.component.css'],
  animations: [
    trigger('alerta',[
      state('show', style({ opacity: 1})),
      state('hide', style({ opacity: 0})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ]
})
export class ListadoProvComponent implements OnInit {

  mensaje:string='Error de conexión con el servidor';
  mostrarAlerta:boolean = false;
  proveedores:any;
  id:string;
  desde:number = 0;
  totales:number;

  constructor(private proveedoresService: ProveedoresService,
              private autenticacionService: AutenticacionService) { }

  ngOnInit() {
    this.cargarProveedores();
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  cargarProveedores(){
    this.proveedoresService.getProveedores(this.desde)
        .subscribe((resp:any)=>{
          this.proveedores=resp.proveedores;
          this.totales=resp.totales;
          console.log(this.proveedores);
    }, error =>{
      console.log(error);
    });
  }

  setDesde(valor){
    var desde = this.desde + valor; //Esto es para que no se actualize en el this.desde, porque si no estaría sumando, aunque no lo mostrase
    if (desde>=this.totales){
      return; //Quiere decir, no hace nada
    } else if (desde<0){
      return;
    } else {
      this.desde += valor;
      this.cargarProveedores();
    }
  }

  obtenerId(id){ //En este metodo nos va a permitir sacar el id del proveedor cuando le demos al primer boton de borrar
    this.id = id;
  }

  borrarProveedor(){ //Y en este método ya tendremos el id, por eso ponemos this.id. Esto es porque pierde el DOM y borraría el proveedor de arriba.
    this.proveedoresService.deleteProveedor(this.id)
                           .subscribe((resp:any)=>{
                            this.mensaje= "El proveedor ha sido eliminado correctamente";
                            this.mostrarAlerta = true;
                            this.cargarProveedores()
                            setTimeout(()=>{
                              this.mostrarAlerta=false;
                            },2500);
                           },(error:any)=>{
                             if (error.error.mensaje === 'token incorrecto')
                            this.mensaje="Su sesión ha caducado, reinicie sesión"
                            this.mostrarAlerta=true;
                            setTimeout(()=>{
                              this.mostrarAlerta=false;
                            },2500);
                           });
    setTimeout(()=>{
      this.mensaje='Error de conexión con el servidor';
    });

  }

}
