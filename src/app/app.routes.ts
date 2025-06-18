import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ReciboComponent } from './recibo/recibo.component';
import { CalidadComponent } from './calidad/calidad.component';
import { CierreComponent } from './cierre/cierre.component';
import { AvanceReciboComponent } from './avance-recibo/avance-recibo.component';
import { ValidacionPreciosComponent } from './validacion/validacion-precios.component';
import { PrimerEmbarqueComponent } from './primer-embarque/primer-embarque.component';
import { SegundoEmbarqueComponent } from './segundo-embarque/segundo-embarque.component';
import { ManifestosComponent } from './manifestos/manifestos.component';
import { ValidaBahiaComponent } from './valida-bahia/valida-bahia.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { PrimerScanerComponent } from './primer-scaner/primer-scaner.component';
import { PrimerFaltantesComponent } from './primer-faltantes/primer-faltantes.component';
import { SegundoScanerComponent } from './segundo-scaner/segundo-scaner.component';
import { SegundoFaltantesComponent } from './segundo-faltantes/segundo-faltantes.component';

export const routes: Routes = [
    { path: '', component: MainMenuComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'calidad', component: CalidadComponent },
    { path: 'recibo', component: ReciboComponent },
    { path: 'cierre', component: CierreComponent },
    { path: 'avance', component: AvanceReciboComponent },
    { path: 'validacion', component: ValidacionPreciosComponent },
    { path: 'primerConteo', component: PrimerEmbarqueComponent },
    { path: 'segundoConteo', component: SegundoEmbarqueComponent },
    { path: 'manifestos', component: ManifestosComponent },
    { path: 'validaBahia', component: ValidaBahiaComponent},
    { path: 'primer-scaner', component: PrimerScanerComponent},
    { path: 'primer-faltantes/:orden', component: PrimerFaltantesComponent},
    { path: 'segundo-scaner', component: SegundoScanerComponent},
    { path: 'segundo-faltantes/:orden', component: SegundoFaltantesComponent}
];
