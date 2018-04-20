import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../../servicios/facturas.service';
import { trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-listado-fac',
  templateUrl: './listado-fac.component.html',
  styleUrls: ['./listado-fac.component.css'],
  animations: [
    trigger('alerta',[
      state('show', style({ opacity: 1})),
      state('hide', style({ opacity: 0})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ]
})
export class ListadoFacComponent implements OnInit {

  mensaje:string='Error de conexión con el servidor';
  mostrarAlerta:boolean = false;
  facturas:any;
  id:string;

  constructor(private facturasService: FacturasService) { }

  ngOnInit() {
    this.cargarFacturas();
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  cargarFacturas(){
    this.facturasService.getFacturas()
        .subscribe((resp:any)=>{
          this.facturas=resp.facturas;
          console.log(this.facturas);
    }, error =>{
      console.log(error);
    });
  }

  obtenerId(id){ //En este metodo nos va a permitir sacar el id del proveedor cuando le demos al primer boton de borrar
    this.id = id;
  }

  borrarFactura(){ //Y en este método ya tendremos el id, por eso ponemos this.id. Esto es porque pierde el DOM y borraría el proveedor de arriba.
    this.facturasService.deleteFactura(this.id)
                           .subscribe((resp:any)=>{
                            this.mensaje= "La factura ha sido eliminada correctamente";
                            this.mostrarAlerta = true;
                            this.cargarFacturas()
                            setTimeout(()=>{
                              this.mostrarAlerta=false;
                            },2500);
                           },(error:any)=>{
                            this.mensaje='Error de conexión con el servidor';
                            this.mostrarAlerta=true;
                            setTimeout(()=>{
                              this.mostrarAlerta=false;
                            },2500);
                           });
  }

}