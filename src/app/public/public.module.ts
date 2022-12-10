import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRouting } from './public.routing';
import { PokemonListComponent } from './сomponents/pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from './сomponents/pokemon-card/pokemon-card.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonCardComponent
  ],
  imports: [
    CommonModule,
    PublicRouting,
    FormsModule
  ]
})
export class PublicModule { }
