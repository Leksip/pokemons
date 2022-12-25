import {Component, Inject, OnInit} from '@angular/core';
import {PokemonService} from "../../services/pokemon.service";
import {Pokemon} from "../../models/pokemon";

import {TuiAlertService, TuiNotification} from "@taiga-ui/core";
import {finalize} from "rxjs";

@Component({
  selector: 'pok-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [] // создаем переменную для покемона
  isLoading: boolean = true
  deletion: Set<number> = new Set<number>()

  constructor(
    private pokemonService: PokemonService,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
  ) {
  }

  ngOnInit(): void {
    this.pokemonService.getAll().subscribe(response => {   // полуаем покемонов из сервиса
        this.pokemons = response.pokemons
        this.isLoading = false
      }
    )
  }

  onDelete(id: number) {
    this.deletion.add(id)
    this.pokemonService.remove(id).pipe(
      finalize(() => {
        this.deletion.delete(id)
      })
    ).subscribe({
        next: () => {
          this.alertService.open(`Покемон успешно удален`, {
            label: `Успешно!`,
            status: TuiNotification.Success
          }).subscribe();
          this.pokemons = this.pokemons.filter(pokemon =>
            pokemon.id != id
          )

        },
        error: () => {
          this.alertService.open('Произошла ошибка, попробуйте еще раз!', {
            label: `Ошибка!`,
            status: TuiNotification.Error
          }).subscribe();
        }
      }
    )

  }
}
