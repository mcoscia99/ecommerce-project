import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Product } from '../../common/product';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-grid.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  
  constructor(private productService: ProductService) {}

  products: Product[] = [];
  
  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    )
  }

}