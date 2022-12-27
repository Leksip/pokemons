import {Component, Inject, OnInit} from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';
import {Pokemon} from '../../models/pokemon';

import {TuiAlertService, TuiNotification} from '@taiga-ui/core';
import {finalize} from 'rxjs';
import {QueryParams} from '../../models/query-params';

@Component({
  selector: 'pok-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  offset: number = 0;
  query: QueryParams[] = [
    {name: 'limit', value: 10},
    {name: 'offset', value: this.offset}
  ];
  page = 0;
  size = 10;
  pokemons: Pokemon[] = [];// создаем переменную для покемона
  total: number = 0;
  isLoading: boolean = false;
  deletion: Set<number> = new Set<number>();

  constructor(
    private pokemonService: PokemonService,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.pokemonService.getAll(this.query).subscribe(response => {   // полуаем покемонов из сервиса
        this.pokemons = response.pokemons;
        this.total = response.count;
        this.isLoading = false;
        console.log(this.pokemons);
      }
    );
  }

  onDelete(id: number) {
    this.deletion.add(id);
    this.pokemonService.remove(id).pipe(
      finalize(() => {
        this.deletion.delete(id);
      })
    ).subscribe({
        next: () => {
          this.alertService.open(`Покемон успешно удален`, {
            label: `Успешно!`,
            status: TuiNotification.Success
          }).subscribe();
          this.pokemons = this.pokemons.filter(pokemon =>
            pokemon.id != id
          );

        },
        error: () => {
          this.alertService.open('Произошла ошибка, попробуйте еще раз!', {
            label: `Ошибка!`,
            status: TuiNotification.Error
          }).subscribe();
        }
      }
    );

  }

  pagination() {
    this.isLoading = true;
    this.pokemons = [];
    this.offset = this.page * this.size;
    this.query = [
      {name: 'limit', value: 10},
      {name: 'offset', value: this.offset + 1}
    ];
    this.pokemonService.getAll(this.query).subscribe(response => {
        this.pokemons = response.pokemons;
        this.isLoading = false;
      }
    );
  }
}
