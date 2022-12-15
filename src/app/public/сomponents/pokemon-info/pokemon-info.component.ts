import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Pokemon} from "../../../admin/models/pokemon";
import {PokemonService} from "../../../admin/services/pokemon.service";
import {Tag} from "../../../admin/models/tag";

@Component({
  selector: 'pok-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.scss']
})
export class PokemonInfoComponent implements OnInit, OnChanges {

  @Input() pokemonId: number = null

  isLoading = false
  pokemon: Pokemon = null
  tags: Tag[] = [];
  total: number

  constructor(private readonly pokemonService: PokemonService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('pokemonId' in changes) {
      if (this.pokemonId) {
        this.getPokemonById()
      } else {
        this.pokemon = null
        this.tags = []
      }
    }

  }

  getPokemonById() {
    this.isLoading = true
    //получить покемона по ID через сервис
    this.pokemonService.getById(this.pokemonId).subscribe(pokemon => {
        this.pokemon = pokemon
        this.isLoading = false
        this.tags = pokemon.tags
        this.getTotal()
      }
    )
  }

  getTotal() {
    this.total = this.pokemon.spd + this.pokemon.stamina + this.pokemon.level + this.pokemon.hp + this.pokemon.attack + this.pokemon.defend
  }
}
