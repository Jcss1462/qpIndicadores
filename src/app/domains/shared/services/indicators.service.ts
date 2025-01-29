import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, query, updateDoc } from '@angular/fire/firestore';
import { Indicators } from '../models/indicators.model';
import { Observable,from, map  } from 'rxjs';

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

  deleteIndicator(id: string): Observable<any> {
    const indicatorRef = doc(this.fireSotre, 'Indicadores', id);
    return from(deleteDoc(indicatorRef));
  }

  getIndicatorById(id: string): Observable<Indicators> {
    const indicatorRef = doc(this.fireSotre, 'Indicadores', id);
    return from(getDoc(indicatorRef)).pipe(
      map((docSnapshot) => {
        if (docSnapshot.exists()) {
          return { id: docSnapshot.id, ...docSnapshot.data() } as Indicators;
        } else {
          throw new Error('Indicador no encontrado');
        }
      })
    );
  }

  updateIndicator(id: string, updatedData: Partial<Indicators>): Observable<any> {
    const indicatorRef = doc(this.fireSotre, 'Indicadores', id);
    return from(updateDoc(indicatorRef, updatedData));
  }
}
