import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRouting } from './admin.routing';
import {LayoutModule} from "./layout/layout.module";
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { TagsListComponent } from './components/tags-list/tags-list.component';
import { TagFormComponent } from './components/tag-form/tag-form.component';
import { PokemonFormComponent } from './components/pokemon-form/pokemon-form.component';
import {SharedModule} from "./shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TuiInputColorModule} from "@taiga-ui/addon-editor";
import {TuiInputCountModule, TuiInputFilesModule} from "@taiga-ui/kit";



@NgModule({
  declarations: [
    PokemonListComponent,
    TagsListComponent,
    TagFormComponent,
    PokemonFormComponent
  ],
  exports: [
  ],
    imports: [
        CommonModule,
        AdminRouting,
        LayoutModule,
        SharedModule,
        ReactiveFormsModule,
        TuiInputColorModule,
        TuiInputCountModule,
        TuiInputFilesModule,

    ]
})
export class AdminModule { }
