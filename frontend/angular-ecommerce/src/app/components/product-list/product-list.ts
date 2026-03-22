import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-grid.html',
  styleUrl: './product-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductList implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  
  constructor(private productService: ProductService, 
              private route: ActivatedRoute,
              private cdr: ChangeDetectorRef) {}

  
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
        this.listProducts();
      });
  }

  listProducts() {
    // Check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the 'id' param string and convert to a number
      // '+' converts to number
      //'!' tells the compiler the object is not null
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;

        this.cdr.markForCheck();
      }
    )
  }

}