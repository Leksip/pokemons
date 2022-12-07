import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layout/components/layout/layout.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {PokemonListComponent} from "./components/pokemon-list/pokemon-list.component";
import {TagsListComponent} from "./components/tags-list/tags-list.component";
import {TagFormComponent} from "./components/tag-form/tag-form.component";
import {PokemonFormComponent} from "./components/pokemon-form/pokemon-form.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', component: DashboardComponent},
      {
        path: 'pokemon-list', children: [
          {path: '', component: PokemonListComponent},
          //TODO Изменить роутер на форму нового покемона
          {path: ':id', component: PokemonFormComponent}
        ]
      },
      {
        path: 'tags-list', children: [
          {path: '', component: TagsListComponent},
          {path: ':id', component: TagFormComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouting {
}
