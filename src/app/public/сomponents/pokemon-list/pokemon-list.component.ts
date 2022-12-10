import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../../../admin/services/pokemon.service";
import {Pokemon} from "../../../admin/models/pokemon";

@Component({
  selector: 'pok-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
pokemons: Pokemon[] = []
  constructor(
    private readonly pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.pokemonService.getAll().subscribe(
      pokemon =>{
        this.pokemons = pokemon
      }
    )
  }

}
