import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  constructor(private snackBar:MatSnackBar) { }

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
        this.snackBar.open('Try Again',"Close",{
          duration:2000,
          direction:'ltr',
          verticalPosition:'bottom',
          horizontalPosition:'start'
        })
      });
  }
}
