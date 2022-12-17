import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRouting } from './public.routing';
import { PokemonListComponent } from './сomponents/pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from './сomponents/pokemon-card/pokemon-card.component';
import {FormsModule} from "@angular/forms";
import {TuiButtonModule} from "@taiga-ui/core";
import { PokemonInfoComponent } from './сomponents/pokemon-info/pokemon-info.component';
import { PokemonInfoMobileComponent } from './сomponents/pokemon-info-mobile/pokemon-info-mobile.component';


@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonCardComponent,
    PokemonInfoComponent,
    PokemonInfoMobileComponent
  ],
    imports: [
        CommonModule,
        PublicRouting,
        FormsModule,
        TuiButtonModule
    ]
})
export class PublicModule { }
