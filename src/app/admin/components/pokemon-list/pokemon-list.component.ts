import {Component, OnInit} from '@angular/core';
import {PokemonService} from "../../services/pokemon.service";
import {Pokemon} from "../../models/pokemon";
import {delay} from "rxjs";
import {FormControl} from '@angular/forms';

@Component({
  selector: 'pok-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [] // создаем переменную для покемона
  isLoading: boolean = true

  constructor(
    private pokemonService: PokemonService
  ) {
  }

  ngOnInit(): void {
    this.pokemonService.getAll().pipe(delay(1500)).subscribe(pokemons => {   // полуаем покемонов из сервиса
        this.pokemons = pokemons
        this.isLoading = false
      }
    )
  }

}
