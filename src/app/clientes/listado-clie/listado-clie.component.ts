import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { ClientesService } from '../../servicios/clientes.service';

@Component({
  selector: 'app-listado-clie',
  templateUrl: './listado-clie.component.html',
  styleUrls: ['./listado-clie.component.css'],
  animations: [
    trigger('alerta',[
      state('show', style({ opacity: 1})),
      state('hide', style({ opacity: 0})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ]
})
export class ListadoClieComponent implements OnInit {

  mensaje:string='Error de conexión con el servidor';
  mostrarAlerta:boolean = false;
  clientes:any;
  id:string;

  constructor(private clientesService: ClientesService) { }

  ngOnInit() {
    this.cargarClientes();
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  cargarClientes(){
    this.clientesService.getClientes()
        .subscribe((resp:any)=>{
          this.clientes=resp.clientes;
          console.log(this.clientes);
    }, error =>{
      console.log(error);
    });
  }

  obtenerId(id){ //En este metodo nos va a permitir sacar el id del proveedor cuando le demos al primer boton de borrar
    this.id = id;
  }

  borrarCliente(){ //Y en este método ya tendremos el id, por eso ponemos this.id. Esto es porque pierde el DOM y borraría el proveedor de arriba.
    this.clientesService.deleteCliente(this.id)
                           .subscribe((resp:any)=>{
                            this.mensaje= "El cliente ha sido eliminado correctamente";
                            this.mostrarAlerta = true;
                            this.cargarClientes()
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
