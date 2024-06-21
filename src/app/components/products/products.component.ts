import {Component, inject, OnInit} from '@angular/core';
import {
    CustomerStatusManagerComponent
} from "../customers/inner/customer-status-manager/customer-status-manager.component";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {NewProductComponent} from "./inner/new-product/new-product.component";
import {UpdateProductComponent} from "./inner/update-product/update-product.component";
import {MatTooltip} from "@angular/material/tooltip";
import {ManageProductImagesComponent} from "./inner/manage-product-images/manage-product-images.component";
import {ProductService} from "../../service/product/product.service";
import {response} from "express";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {debounceTime} from "rxjs";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ClipboardService} from "../../service/clipboard/clipboard.service";
import {DeleteProductComponent} from "./inner/delete-product/delete-product.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CustomerStatusManagerComponent,
    MatIcon,
    MatIconButton,
    MatButton,
    MatTooltip,
    NgForOf,
    CurrencyPipe,
    MatProgressBar,
    NgIf,
    ReactiveFormsModule,
    MatPaginator
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{

  readonly matDialog = inject(MatDialog);
  readonly productService = inject(ProductService);
  readonly snackBar = inject(MatSnackBar);
  readonly CopyService = inject(ClipboardService);

  searchtext = '';

  page:any = 0

  size:any = 2

  count = 0;

  allProducts:any[] = [];


  searchForm = new FormGroup<any>({
    text:new FormControl('',[
      Validators.required
    ])
  })

  loading = false;

  constructor() {
    this.loading = true;
  }

  ngOnInit(): void {

    this.loadAllProduct();

    this.searchForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(data=>{
        this.searchtext = data
        this.loadAllProduct();
      })
  }

  openNewProductForm(){
    let matDialogRef = this.matDialog.open(NewProductComponent,{
      width:"500px",
      disableClose:true,
    });

    matDialogRef.afterClosed().subscribe(response=>{
      if (response){
        this.loadAllProduct();
      }
    })

  }

  openUpdateProductForm(product:any){
    let matDialogRef = this.matDialog.open(UpdateProductComponent,{
      width:"500px",
      disableClose:true,
      data:product,
    });

    matDialogRef.afterClosed().subscribe(response=>{
      if (response){
        this.loadAllProduct();
      }
    })

  }

  openProductImagesForm(product:any){
    let matDialogRef = this.matDialog.open(ManageProductImagesComponent,{
      width:"700px",
      disableClose:true,
      data:product,
    });

    matDialogRef.afterClosed().subscribe(response=>{
      if (response){
        this.loadAllProduct();
      }
    })

  }

  private loadAllProduct() {
    this.productService.getAll(this.searchtext,this.page,this.size)
      .subscribe(response=>{
        this.allProducts = response.data?.dataList;
        this.count = response.data?.count;
        console.log(response.data?.datalist)
        this.loading = false;
    })

  }

  openDeleteProductForm(product: any) {
    if (confirm("Are You Sure?")){
      this.productService.delete(product.propertyId).subscribe(response=>{
        this.loadAllProduct();
        this.snackBar.open('Deleted!','Close',{
          duration:3000,
          direction:'ltr',
          verticalPosition:'bottom',
          horizontalPosition:'start'
        })
      },error => {
        console.log(error.error.message);
      })
    }
  }

  getServerData(data:PageEvent) {
    this.page = data.pageIndex;
    this.size = data.pageSize;
    this.loadAllProduct();
  }

  copyToClipboard(propertyId: any) {
    this.CopyService.copyToClipboard(propertyId);
  }
}
