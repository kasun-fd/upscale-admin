import {Component, inject} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductService} from "../../../../service/product/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    ReactiveFormsModule
  ],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss'
})
export class NewProductComponent {

  loading = false;

  readonly dialogRef = inject(MatDialogRef<NewProductComponent>);
  readonly productService= inject(ProductService);
  readonly snackBar = inject(MatSnackBar);

  form = new FormGroup({
    qty: new FormControl('',[
      Validators.required
    ]),
    unitPrice: new FormControl('',[
      Validators.required
    ]),
    description: new FormControl('',[
      Validators.required
    ])
  })

  create(){

    this.loading = true;

    const obj = {
      qty:this.form.value.qty,
      unitPrice:this.form.value.unitPrice,
      description:this.form.value.description
    }

    this.productService.create(obj).subscribe(response=>{
      this.dialogRef.close(true);
      this.loading = false;
      this.snackBar.open('Product Saved!','Close',{
        duration:5000,
        direction:'ltr',
        verticalPosition:'bottom',
        horizontalPosition:'start'
      })
    },error => {
      this.loading = false;
      console.log(error?.error?.message);
    })

  }

  close(){
    this.dialogRef.close(false);
  }

}
