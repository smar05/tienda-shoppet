import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../servicios/servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  pagina : any = {};
  datos : any = {};
  carrito : any = [];
  indicativo : number = 57;
  whatsapp : any = null;
  total : number = 0;
  irWhatsapp : boolean = false;

  constructor(public servicio:ServicioService) { }

  ngOnInit() {
    this.servicio.getPagina().valueChanges()
    .subscribe(pagina=>{
      this.pagina = pagina;
    });
    this.carrito = this.servicio.getCarrito();
    this.calcularTotal();
  }

  public goToPage(a:number)
  {
    if(a==0)
    {
      this.servicio.goToUrl('https://api.whatsapp.com/send?phone='+this.pagina.whatsapp);
    }else if(a==1)
    {
      this.servicio.goToUrl('https://www.instagram.com/'+this.pagina.instagram);
    }else if(a==2)
    {
      this.servicio.goToUrl('https://www.facebook.com/'+this.pagina.facebook);
    }
  }

  public back()
  {
    this.servicio.back();
  }

  public delete(id:any)
  {
    for(let j=0;j<this.carrito.length;j++){
      if(this.carrito[j].id==id){
        this.carrito[j].id=null;
        this.carrito[j].cantidad = 0;
      }
    }
    this.calcularTotal();
    //delete this.carrito[i];
    //this.servicio.deleteCarrito(producto);
  }

  public enviarPedido()
  {
    this.datos.whatsapp = (this.indicativo.toString()).concat(this.whatsapp.toString());    
    this.datos.id = this.datos.fecha = Date.now();
    this.calcularTotal();
    this.datos.total = this.total;
    this.servicio.setCarrito(this.carrito);
    this.servicio.enviarPedido(this.datos);
    //this.servicio.exito('Pedido solicitado');
    this.pedirWha();
    this.servicio.setCarrito([]);
    this.carrito = [];
    this.total = 0;
    this.irWhatsapp = true;
  }

  public pedirWha(){
    Swal.fire({
      title: 'Enviar Whatsapp',
      text: "¿Deseas enviar un whatsapp al vendedor?",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.enviarWhatsapp();
      }else{
        this.back();        
      }
      Swal.fire(
        'Listo',
        'Gracias por tu pedido',
        'success'
      )
    })
  }

  public enviarWhatsapp()
  {
    this.servicio.goToUrl('https://api.whatsapp.com/send?phone='+this.pagina.indicativo+this.pagina.whatsapp+'&text=Hola%2CHe%20solicitado%20una%20cotizacion%20a%20nombre%20de%20'+this.datos.nombre.replace(/ /gi,'%20'));
  }

  async modCarrito(i:any)
  {
    const { value: cantidad } = await Swal.fire({
      title: 'Agregar al carrito',
      input: 'number',
      inputLabel: 'Ingrese la cantidad',
      inputPlaceholder: 'Ingrese la cantidad'
    })
    
    if ((cantidad != null)&&(cantidad > 0)) {
      Swal.fire(`Cantidad agregada: ${cantidad}`)
      this.carrito[i].cantidad = cantidad;
      this.servicio.setCarrito(this.carrito);      
    }else{
      this.carrito[i].cantidad = 0;
      alert('Ingrese una cantidad');
    }
    this.calcularTotal();
  }  

  public calcularTotal()
  {
    this.total = 0;
    for(let i=0;i<this.carrito.length;i++)
    {
      this.total += this.carrito[i].precio*this.carrito[i].cantidad;
    }
  }

}
