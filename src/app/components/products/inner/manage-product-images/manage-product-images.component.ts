import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductImagesService} from "../../../../service/product-images/product-images.service";
import {response} from "express";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-manage-product-images',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './manage-product-images.component.html',
  styleUrl: './manage-product-images.component.scss'
})
export class ManageProductImagesComponent implements OnInit{

  messageBox = false;
  content = false;
  selectedImage:any;

  product:any;

  readonly data = inject(MAT_DIALOG_DATA);

  form = new FormGroup({
    file:new FormControl('',[
      Validators.required
    ])
  })

  constructor(
    private imageService:ProductImagesService,
    private dialogRef:MatDialogRef<ManageProductImagesComponent>,
    private snackBar:MatSnackBar
  ) {
    this.product = this.data;
  }

  ngOnInit(): void {
    this.content = true;
  }

  addImages(){
    this.imageService.create(this.selectedImage,this.product.propertyId).subscribe(response=>{
      this.dialogRef.close(true);

      this.snackBar.open('Image Added!','Close',{
        duration:3000,
        direction:'ltr',
        verticalPosition:'bottom',
        horizontalPosition:'start'
      })

    },error => {
      console.log(error?.error?.message);
    })
  }

  imageChange(file: any) {
    this.selectedImage = file.target.files[0];
  }
}
