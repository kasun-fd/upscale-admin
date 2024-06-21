import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductService} from "../../../../service/product/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule
  ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit {

  loading = false;

  readonly dialogRef = inject(MatDialogRef<UpdateProductComponent>);
  readonly productService = inject(ProductService);
  readonly snackBar = inject(MatSnackBar);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  form = new FormGroup({
    qty: new FormControl('', [
      Validators.required
    ]),
    unitPrice: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ])
  })

  ngOnInit(): void {
    this.form.patchValue({
      qty: this.data.product.qty,
      description: this.data.product.description,
      unitPrice: this.data.product.unitPrice
    })
  }

  update() {

    this.loading = true;

    const obj = {
      qty: this.form.value.qty,
      unitPrice: this.form.value.unitPrice,
      description: this.form.value.description
    }

    this.productService.update(obj, this.data.product.propertyId).subscribe(response => {
      this.dialogRef.close(true);
      this.loading = false;
      this.snackBar.open('Product Updated!', 'Close', {
        duration: 5000,
        direction: 'ltr',
        verticalPosition: 'bottom',
        horizontalPosition: 'start'
      })
    }, error => {
      this.loading = false;
      console.log(error?.error?.message);
    })

  }

  close() {
    this.dialogRef.close(false);
  }

}
