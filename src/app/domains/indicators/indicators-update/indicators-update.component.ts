import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerService } from '../../shared/services/spinner.service';
import { IndicatorsService } from '../../shared/services/indicators.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Indicators } from '../../shared/models/indicators.model';

@Component({
  selector: 'app-indicators-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './indicators-update.component.html',
  styleUrl: './indicators-update.component.css'
})
export class IndicatorsUpdateComponent {

  indicadorId!: string;
  indicatorForm: FormGroup;
  private spinnerService = inject(SpinnerService);
  private indicatorsService = inject(IndicatorsService);

  constructor(private fb: FormBuilder, private toastr: ToastrService,private route: ActivatedRoute, private router: Router) {
    this.indicatorForm = this.fb.group({
      id: "",
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

  ngOnInit(): void {
    this.indicadorId = this.route.snapshot.paramMap.get('id')!;
    this.getIndicatorById(this.indicadorId);
  }


  getIndicatorById(id: string) {
    this.spinnerService.showSpinner.update(() => true);
    this.indicatorsService.getIndicatorById(id)
      .subscribe({
        next: (indicator) => {
          //seteo los valores del empleado en el formulario
          this.indicatorForm.setValue({
            id: indicator.id,
            fecha: indicator.fecha,
            meta: indicator.meta,
            nivel: indicator.nivel,
            nombre: indicator.nombre,
            proceso: indicator.proceso,
            responsable: indicator.responsable,
            valor: indicator.valor,
            variacion: indicator.variacion
          });

          console.log(this.indicatorForm.value)

          this.spinnerService.showSpinner.update(() => false);
        },
        error: () => {
          this.toastr.error("Error al intentar obtener la informacion del indicador con id: " + id);
          this.spinnerService.showSpinner.update(() => false);
        }
      })
  }


  onSubmit(): void {
    if (this.indicatorForm.valid) {
      const indicatorToUpdate: Indicators = this.indicatorForm.value;
      this.spinnerService.showSpinner.update(() => true);
      this.indicatorsService.updateIndicator(indicatorToUpdate.id,indicatorToUpdate).subscribe({
        next: (response) => {
          this.toastr.success("Indicador actualizado con exito");
          this.spinnerService.showSpinner.update(() => false);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.toastr.error("Ocurrio un error al editar el indicador");
          this.spinnerService.showSpinner.update(() => false);
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }

  cancel(){
    this.router.navigate(['/']);
  }

}
