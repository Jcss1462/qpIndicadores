import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Indicators } from '../../shared/models/indicators.model';
import { SpinnerService } from '../../shared/services/spinner.service';
import { IndicatorsService } from '../../shared/services/indicators.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indicators-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './indicators-create.component.html',
  styleUrl: './indicators-create.component.css'
})
export class IndicatorsCreateComponent {

  indicatorForm: FormGroup;
  private spinnerService = inject(SpinnerService);
  private indicatorsService = inject(IndicatorsService);

  constructor(private fb: FormBuilder, private toastr: ToastrService,private router: Router) {
    this.indicatorForm = this.fb.group({
      fecha: ['', Validators.required],
      meta: ['', [Validators.required, Validators.min(0)]],
      nivel: ['', Validators.required],
      nombre: ['', Validators.required],
      proceso: ['', Validators.required],
      responsable: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0)]],
      variacion: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.indicatorForm.valid) {
      const newIndicator: Indicators = this.indicatorForm.value;
      this.spinnerService.showSpinner.update(() => true);
      this.indicatorsService.createIndicator(newIndicator).subscribe({
        next: (response) => {
          this.toastr.success("Indicador creado con exito");
          this.spinnerService.showSpinner.update(() => false);
          this.router.navigate(['/']);     
        },
        error: (err) => {
          this.toastr.error("Ocurrio un error al crear el indicador");
          this.spinnerService.showSpinner.update(() => false);
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }

}
