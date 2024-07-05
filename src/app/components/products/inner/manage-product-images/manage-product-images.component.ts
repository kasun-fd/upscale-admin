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
import {response} from "express";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductService} from "../../../../service/product/product.service";

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
export class ManageProductImagesComponent implements OnInit {

  messageBox = false;
  content = false;
  image: any;
  loading: boolean = false;

  product: any;

  readonly data = inject(MAT_DIALOG_DATA);
  readonly service = inject(ProductService);

  form = new FormGroup({
    file: new FormControl(null, [
      Validators.required
    ])
  })

  constructor(
    private dialogRef: MatDialogRef<ManageProductImagesComponent>,
    private snackBar: MatSnackBar
  ) {
    this.product = this.data;
  }

  ngOnInit(): void {
    this.content = true;
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    this.image = fileInput.files?.[0];
    if (this.image) {
      if (this.isFileSizeValid(this.image)) {
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'pdf'];
        const fileExtension = this.image.name.split('.').pop()?.toLowerCase();

        if (fileExtension && allowedExtensions.includes(fileExtension)) {
          this.handleFile(this.image);
        } else {
          this.image = null;
          fileInput.value = '';
          return;
        }

      } else {
        this.image = null;
        fileInput.value = '';
        return;
        // Show a warning or error message to the user indicating that the file size is too large.
      }
    }
  }

  isFileSizeValid(file: File): boolean {
    const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB in bytes
    return file.size <= maxSizeInBytes;
  }

  handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result;
    };
    reader.readAsDataURL(file);
  }

  uploadFile() {

    this.loading = true;

    const formdata = new FormData();
    formdata.append('productImage', this.image)

    this.service.productImageUpload(formdata, this.data?.propertyId)
      .subscribe(response => {
        console.log(response);
        this.loading = false;
      });
  }

}
