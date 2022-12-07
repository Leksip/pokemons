import {Component, Inject, OnInit} from '@angular/core';
import {PokemonService} from "../../services/pokemon.service";
import {Pokemon} from "../../models/pokemon";

import {TuiAlertService, TuiNotification} from "@taiga-ui/core";

@Component({
  selector: 'pok-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [] // создаем переменную для покемона
  isLoading: boolean = true

  constructor(
    private pokemonService: PokemonService,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
  ) {
  }

  ngOnInit(): void {
    this.pokemonService.getAll().subscribe(pokemons => {   // полуаем покемонов из сервиса
        this.pokemons = pokemons
        this.isLoading = false
      }
    )
  }

  onDelete(id: number) {
    this.pokemonService.remove(id).subscribe({
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
