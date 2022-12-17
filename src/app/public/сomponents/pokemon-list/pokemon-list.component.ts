import {Component, OnInit} from '@angular/core';
import {PokemonService} from "../../../admin/services/pokemon.service";
import {Pokemon} from "../../../admin/models/pokemon";
import {Tag} from "../../../admin/models/tag";

@Component({
  selector: 'pok-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = []
  tagColor: string
  selectedPokemonId: number

  constructor(
    private readonly pokemonService: PokemonService,
  ) {
  }

  ngOnInit(): void {
    this.pokemonService.getAll().subscribe(
      pokemons => {
        this.pokemons = pokemons
      }
    )
  }

  onSelectPokemon(id: number, tags: Tag[]) {
    if (this.selectedPokemonId === id) {
      this.selectedPokemonId = null
      this.tagColor = ''
    } else
      this.selectedPokemonId = id
    this.tagColor = tags[0].color

  }

  closeMenu() {
    this.selectedPokemonId = null
  }
}
