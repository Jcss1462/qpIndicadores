import { Routes } from '@angular/router';
import { HeaderComponent } from './domains/shared/components/header/header.component';
import { IndicatorsListComponent } from './domains/indicators/indicators-list/indicators-list.component';
import { IndicatorsCreateComponent } from './domains/indicators/indicators-create/indicators-create.component';
import { IndicatorsUpdateComponent } from './domains/indicators/indicators-update/indicators-update.component';

export const routes: Routes = [


    {
        path: "",
        component: HeaderComponent,
        children: [
            {
                path: "",
                component: IndicatorsListComponent
            }
            ,{
                path: "createIndicator",
                component: IndicatorsCreateComponent
            }
            ,{
                path: "updateIndicator/:id",
                component: IndicatorsUpdateComponent
            }         
        ]
    }
];
