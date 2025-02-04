import { Component, inject, signal } from '@angular/core';
import { Indicators } from '../../shared/models/indicators.model';
import { SpinnerService } from '../../shared/services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { IndicatorsService } from '../../shared/services/indicators.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indicators-list',
  standalone: true,
  imports: [],
  templateUrl: './indicators-list.component.html',
  styleUrl: './indicators-list.component.css'
})
export class IndicatorsListComponent {

  indicators= signal<Indicators[]>([]);
  private spinnerService = inject(SpinnerService);
  private indicatorsService = inject(IndicatorsService);

  constructor(private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    // Datos de ejemplo (puedes reemplazarlos con datos de Firestore u otro origen)
    this.getIndicadores();
  }

  getIndicadores(){
    this.spinnerService.showSpinner.update(() => true);
    this.indicatorsService.getIndicators().subscribe({
      next: (indicators) => {
        this.indicators.set(indicators);
        this.spinnerService.showSpinner.update(() => false);     
      },
      error: (err) => {
        this.toastr.error("Ocurrio un error al cargar los indicadores");
        this.spinnerService.showSpinner.update(() => false);
      }
    });
  }

  // Función para editar un indicador
  editIndicator(id: string) {
    this.router.navigate(['/updateIndicator', id]);
  }

  // Función para eliminar un indicador
  deleteIndicator(id: string) {
    this.spinnerService.showSpinner.update(() => true);
    this.indicatorsService.deleteIndicator(id).subscribe({
      next: (result) => {
        this.toastr.success("Indicador eliminado con exito");
        this.getIndicadores();    
      },
      error: (err) => {
        this.toastr.error("Ocurrio un error al eliminar el indicador con id: "+id);
        this.spinnerService.showSpinner.update(() => false);
      }
    });
  }

}
