import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, query } from '@angular/fire/firestore';
import { Indicators } from '../models/indicators.model';
import { Observable,from  } from 'rxjs';

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

  createIndicator(indicator: Indicators): Observable<any> {
    const indicatorsRef = collection(this.fireSotre, 'Indicadores');
    return from(addDoc(indicatorsRef, indicator));
  }
}
