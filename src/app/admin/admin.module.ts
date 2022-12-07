import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRouting } from './admin.routing';
import {LayoutModule} from "./layout/layout.module";
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { TagsListComponent } from './components/tags-list/tags-list.component';
import { TagFormComponent } from './components/tag-form/tag-form.component';
import { PokemonFormComponent } from './components/pokemon-form/pokemon-form.component';
import {SharedModule} from "./shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TuiInputColorModule} from "@taiga-ui/addon-editor";


@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonCardComponent,
    TagsListComponent,
    TagFormComponent,
    PokemonFormComponent
  ],
  imports: [
    CommonModule,
    AdminRouting,
    LayoutModule,
    SharedModule,
    ReactiveFormsModule,
    TuiInputColorModule,
  ]
})
export class AdminModule { }
