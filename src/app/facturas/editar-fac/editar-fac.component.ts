import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { FacturasService } from '../../servicios/facturas.service';

@Component({
  selector: 'app-editar-fac',
  templateUrl: './editar-fac.component.html',
  styleUrls: ['./editar-fac.component.css'],
  animations: [
    trigger('alerta',[
      state('show', style({ opacity: 1})),
      state('hide', style({ opacity: 0})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ]
})
export class EditarFacComponent implements OnInit {

  @ViewChild('factura') facturaRef: ElementRef;
  @ViewChild('cif') cifRef: ElementRef;


  proveedor:String;
  base: number;
  tipo: number;
  importe: number;
  total: number;
  irpf: number;
  fecha: Date;
  retencion: boolean = false;
  cif:boolean =false;
  mensaje:string='Error de conexión con el servidor';
  mostrarAlerta:boolean = false;
  enviando:boolean=false;
  
  formFra: FormGroup;
  factura:any;
  id:String;

  constructor(private ff: FormBuilder,
    private facturasService : FacturasService,
    private router: Router,
    private route: ActivatedRoute) {
      if (!this.factura){
        this.factura={};
      }
      }

  ngOnInit() {
    // console.log(this.route.snapshot.params['id']); //Para que nos pinte el id del proveedor en el console log y en la url
    this.id=this.route.snapshot.params['id'];
    this.cargarFactura(this.id); //id del proveedor
    this.formFra=this.ff.group({
      proveedor: [null, Validators.required],
      cif: ['', [Validators.required, Validators.minLength(9)]],

      fecha: new Date(),
      concepto: null,
      base: [null,[Validators.required, Validators.max(100000)]],
      retencion: false,
      tipo: 0.21,
      irpf:null,
      importe: null,
      total: null
    });
    this.detectarCambios();
  }

  cargarFactura(id){
    this.facturasService.getFacturaId(id)
                           .subscribe((res:any)=>{
                             this.factura=res.factura;
                             console.log(this.factura);
                           })
  }

  editarFra(){
    this.factura= this.guardarFra();
    this.facturasService.putFactura(this.id,this.factura)
                           .subscribe((res:any)=>{
                            this.router.navigate(['/listado-facturas']);
                           });
  }


  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  // iniciarFormulario(){
  //   this.formFra=this.ff.group({
  //     proveedor: [null, Validators.required],
  //     cif: ['', [Validators.required, Validators.minLength(9)]],

  //     fecha: new Date(),
  //     concepto: null,
  //     base: [null,[Validators.required, Validators.max(100000)]],
  //     retencion: false,
  //     tipo: 0.21,
  //     irpf: this.formatearMoneda(0),
  //     importe: this.formatearMoneda(0),
  //     total: this.formatearMoneda(0)
  //   });
  //   this.detectarCambios();
  // }

  redondear(valor){
    var valor;
    if (valor < 0 ) {
      var resultado=Math.round(-valor*100)/100 * -1;
  } else {
      var resultado=Math.round(valor*100)/100;
  }
  return resultado;
  }

  formatearMoneda(valor){
    var resultado = new Intl.NumberFormat("es-ES",{style:"currency", currency: "EUR"}).format(valor);  
    return resultado;
  }

  detectarCambios(){
    this.formFra.valueChanges.subscribe(valoresForm=>{
      // this.cif = valoresForm.cif.startsWith('A') || valoresForm.cif.startsWith('B');
      this.base = this.redondear(valoresForm.base);
      this.retencion = valoresForm.retencion;
      this.tipo = valoresForm.tipo;
      if (this.retencion){
        this.irpf = this.redondear(this.base * -0.15);
      } else {
        this.irpf= 0;
      }
      this.importe= this.redondear(this.base * this.tipo);
      this.total= this.redondear(this.base + this.irpf + this.importe);
      this.formFra.value.irpf=this.formatearMoneda(this.irpf);
      this.formFra.value.importe=this.formatearMoneda(this.importe);
      this.formFra.value.total=this.formatearMoneda(this.total);
    });
  }

  // registrarFra(){
  //   this.factura = this.guardarFra();
  //   this.iniciarFormulario();
  //   this.facturaRef.nativeElement.focus();
  // }

  guardarFra(){
    const guardarFra = {
      proveedor: this.formFra.get("proveedor").value,
      cif: this.formFra.get("cif").value,
      fecha: this.formFra.get("fecha").value,
      concepto: this.formFra.get("concepto").value,
      base: this.formFra.get("base").value,
      retencion: this.formFra.get("retencion").value,
      tipo: this.formFra.get("tipo").value,
      irpf: this.formFra.get("irpf").value,
      importe: this.formFra.get("importe").value,
      total: this.formFra.get("total").value,
      fechaRegistro: new Date()
    }
    return guardarFra;
  }


}
