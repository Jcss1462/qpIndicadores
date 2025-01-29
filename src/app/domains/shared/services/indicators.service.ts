import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore, query } from '@angular/fire/firestore';
import { Indicators } from '../models/indicators.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndicatorsService {

  private fireSotre = inject(Firestore);

  constructor() { }

  getIndicators():Observable<Indicators[]>{

    const indicatorsRef = collection(this.fireSotre, 'Indicadores');
    return collectionData(indicatorsRef, { idField: 'id' }) as Observable<Indicators[]>;
  }
}
