import { Injectable,Inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { DOCUMENT,Location } from '@angular/common';
import { sortBy } from 'sort-by-typescript';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private uid = "VcxOrH9XyFaOHHPBj7DxgfuHi143";
  private carrito : any = [];

  constructor(public data:AngularFireDatabase,@Inject(DOCUMENT) public doc:Document,public location:Location) { }

  public ordenar(arreglo:any,parametro:string)
  {
    return arreglo.sort(sortBy(parametro));
  }

  public getProductos()
  {
    return this.data.list('usuario/'+this.uid+'/productos');
  }

  public getSubVariantes(id:any)
  {
    return this.data.list('usuario/'+this.uid+'/productos/'+id+'/subVariante');
  }

  public getPagina()
  {
    return this.data.object('usuario/'+this.uid+'/pagina');
  }

  public getProducto(id : any)
  {
    return this.data.object('usuario/'+this.uid+'/productos/'+id);
  }

  public getCategorias()
  {
    return this.data.list('usuario/'+this.uid+'/categorias');
  }

  public goToUrl(url:string)
  {
    this.doc.location.href = url;
  }

  public agregarCarrito(producto:any)
  {
    this.carrito.push(producto);
  }

  public getCarrito()
  {
    return this.carrito;
  }

  public setCarrito(pedido:any)
  {
    this.carrito = pedido;
  }

  public deleteCarrito(producto:any)
  {
    for(let i=0;i<this.carrito.length;i++)
    {
      if(this.carrito[i].id==producto.id)
      {
        this.carrito.splice(i,1);
      }
    }
    this.back();
    //this.presentAlert('Eliminado','Producto eliminado con exito');
  }

  public enviarPedido(datos:any)
  {
    this.data.database.ref('usuario/'+this.uid+'/pedidos/'+datos.fecha+'/datos').set(datos);
    for(let i=0;i<this.carrito.length;i++)
    {
      this.data.database.ref('usuario/'+this.uid+'/pedidos/'+datos.fecha+'/productos/'+this.carrito[i].id).set(this.carrito[i]);
    }
  }

  public exito(titulo:string)
  {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: titulo,
      showConfirmButton: false,
      timer: 1500
    })
  }

  public back()
  {
    this.location.back();
  }

}
