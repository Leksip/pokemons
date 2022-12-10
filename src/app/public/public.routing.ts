import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokemonListComponent} from "./сomponents/pokemon-list/pokemon-list.component";

const routes: Routes = [
  { path: '',component:PokemonListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRouting { }
