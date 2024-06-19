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
    NgIf
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{

  readonly matDialog = inject(MatDialog);
  readonly productService = inject(ProductService);
  readonly snackBar = inject(MatSnackBar);

  allProducts:any[] = [];

  loading = false;

  constructor() {
    this.loading = true;
  }

  ngOnInit(): void {
    this.loadAllProduct();
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
    let all = this.productService.getAll("",0,7);
    all.subscribe((resp)=>{
      let data = resp.data.dataList;
      if (this.allProducts = data){
        this.loading = false;
      }
    },error => {
      console.log(error?.error?.message);
      this.loading = false;
    })
  }

  copyToClipboard(id:string) {
    navigator.clipboard.writeText(id)
      .then(() => {
        this.snackBar.open('Copied',"Close",{
          duration:2000,
          direction:'ltr',
          verticalPosition:'bottom',
          horizontalPosition:'start'
        })
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  }

  openDeleteProductForm(product: any) {

  }
}
