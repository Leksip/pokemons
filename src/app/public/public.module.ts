import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRouting } from './public.routing';
import { PokemonListComponent } from './сomponents/pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from './сomponents/pokemon-card/pokemon-card.component';
import {FormsModule} from "@angular/forms";
import {TuiButtonModule} from "@taiga-ui/core";
import { PokemonInfoComponent } from './сomponents/pokemon-info/pokemon-info.component';


@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonCardComponent,
    PokemonInfoComponent
  ],
    imports: [
        CommonModule,
        PublicRouting,
        FormsModule,
        TuiButtonModule
    ]
})
export class PublicModule { }
