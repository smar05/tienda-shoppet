import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ServicioService } from '../../servicios/servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public categorias : any = [];
  public productos : any = [];
  public pagina : any = {};
  public loading : boolean = true;
  public nuevo : any = [];
  public categoriaActual : any = null;
  public loadingPagina : boolean = true;
  public carritoData : any = [];
  public categoriasNombre : any = [];
  public nombreCategoria : any = null;


  constructor(public servicio:ServicioService,public router:Router) { }

  ngOnInit(): void {
    this.servicio.getPagina().valueChanges()
    .subscribe(datos=>{
      this.pagina = datos;
      this.loadingPagina = false;
    });
    this.servicio.getCategorias().valueChanges()
    .subscribe(categorias =>{
      this.categorias = categorias;
      for(let i=0;i<this.categorias.length;i++){
        this.categorias[i].activar = false;
      }
      this.categoriasOrdenadas();
    });
    this.servicio.getProductos().valueChanges()
    .subscribe(productos=>{
      this.nuevo = this.productos = productos;
      this.loading = false;
    });
    this.productos  = this.productosOrdenados();
    this.categorias = this.categoriasOrdenadas();
    this.carritoData = this.servicio.getCarrito();
  }
 
  public productosOrdenados()
  {
    this.productos = this.servicio.ordenar(this.productos,'nombre');
    return this.productos;
  }

  public categoriasOrdenadas()
  {
    this.categorias = this.servicio.ordenar(this.categorias,'nombre');
    for(let i=0; i<this.categorias.length;i++){
      this.categoriasNombre.push({nombre:this.categorias[i].nombre});
    }
    return this.categorias;
  }

  public cart()
  {
    this.router.navigate(['/carrito']);
  }

  public goToPage(a:number)
  {
    if(a==0)
    {
      this.servicio.goToUrl('https://api.whatsapp.com/send?phone='+this.pagina.indicativo+this.pagina.whatsapp);
    }else if(a==1)
    {
      this.servicio.goToUrl('https://www.instagram.com/'+this.pagina.instagram);
    }else if(a==2)
    {
      this.servicio.goToUrl('https://www.facebook.com/'+this.pagina.facebook);
    }
  }

  async carrito(producto:any)
  {
    const { value: cantidad } = await Swal.fire({
      title: 'Agregar al carrito',
      input: 'number',
      inputLabel: 'Ingrese la cantidad',
      inputPlaceholder: 'Ingrese la cantidad'
    }) 
    if ((cantidad != null)&&(cantidad > 0)) {      
      producto.cantidad = cantidad;
      this.servicio.agregarCarrito(producto);
      Swal.fire(`Cantidad agregada: ${cantidad}`)
    }else{
      alert('Ingrese una cantidad');
    }
  }

  public activarCategoria(){
    this.escojerCategoria();
    for(let i=0;i<this.categorias.length;i++){
      if(this.categorias[i].nombre === this.nombreCategoria){
        //this.categorias[i].activar = !this.categorias[i].activar
        this.categoriaActual = this.categorias[i].id;
      }/*else{
        this.categoriaActual = null;
        //this.categorias[i].activar = false;
      }*/
    }
  }

  async escojerCategoria(){
    const { value: fruit } = await Swal.fire({
      title: 'Select field validation',
      input: 'select',
      inputOptions: {
        'Fruits': {
          apples: 'Apples',
          bananas: 'Bananas',
          grapes: 'Grapes',
          oranges: 'Oranges'
        },
        'Vegetables': {
          potato: 'Potato',
          broccoli: 'Broccoli',
          carrot: 'Carrot'
        },
        'icecream': 'Ice cream'
      },
      inputPlaceholder: 'Select a fruit',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === 'oranges') {
            //resolve();
          } else {
            resolve('You need to select oranges :)')
          }
        })
      }
    })
    
    if (fruit) {
      Swal.fire(`You selected: ${fruit}`)
    }
    /*const { value: fruit } = await Swal.fire({
      title: 'Seleccione una categoria',
      input: 'select',
      inputOptions: this.categoriasNombre,
      inputPlaceholder: 'Seleccione',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            this.nombreCategoria = value;
          } else {
            resolve('Seleccione una categoria');
          }
        })
      }
    })
    
    if (fruit) {
      Swal.fire(`Seleccionaste: ${fruit}`)
    }*/
  }

  

}