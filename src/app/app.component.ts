import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'qpIndicadores';
  constructor(private toastr: ToastrService){}
  showToaster(){
    this.toastr.success("Mensaje enviado con éxito");
  }
}
