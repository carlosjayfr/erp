import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { SesionesService } from '../../servicios/sesiones.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('alerta',[
      state('show', style({ opacity: 1})),
      state('hide', style({ opacity: 0})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  usuario: any;
  sesion: any;
  mensaje:string='Error de conexión con el servidor';
  mostrarAlerta:boolean = false;
  enviando:boolean=false;

  constructor(private fl: FormBuilder,
              private autenticacionService: AutenticacionService,
              private sesionesService: SesionesService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm=this.fl.group({
      email:['', Validators.email],
      password:['',Validators.required]
    });
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  inicioSesion(){
    this.mostrarAlerta=false;
    this.enviando=true;
    this.usuario= this.guardarUsuario();
    this.autenticacionService.login(this.usuario)
                             .subscribe((res:any)=>{
                              console.log(res);
                              this.enviando=false;
                              this.crearSesion();
                              this.router.navigate(['/']);
                             },(error:any)=>{
                               this.mostrarAlerta=true;
                               if (error.error.mensaje){
                                 this.mensaje = error.error.mensaje;
                               }
                             });
    
    
  }

  guardarUsuario(){
    const guardarUsuario = {
      email: this.loginForm.get('email').value.toLowerCase(),
      password: this.loginForm.get('password').value
    }
    return guardarUsuario;
}


  crearSesion(){
    this.sesion = {
      nombre: this.autenticacionService.nombre,
      login: new Date()
     
    }
    this.sesionesService.postSesion(this.sesion)
                        .subscribe((res:any)=>{
                          console.log(res);                 
                        },(error)=>{
                          console.log(error);
                        })
                      }                       

}
