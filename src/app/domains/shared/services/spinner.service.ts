import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  showSpinner =signal(false);
  constructor() { }
}
