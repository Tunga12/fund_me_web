import { Injectable } from '@angular/core';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor() {}
  getConfig(): MatSnackBarConfig {
    return {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 2000,
    };
  }
}
