import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from "../models/products.model";

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) { }

  public postProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('https://march11app.herokuapp.com/product', product);
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://march11app.herokuapp.com/product');
  }

  public getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(`https://march11app.herokuapp.com/product/${productId}`);
  }

  public putProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`https://march11app.herokuapp.com/product/${product.id}`, product)
  }

  public deleteProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(`https://march11app.herokuapp.com/product/${product.id}`)
  }
}
