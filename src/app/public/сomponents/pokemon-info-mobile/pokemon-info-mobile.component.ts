import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Pokemon} from "../../../admin/models/pokemon";
import {Tag} from "../../../admin/models/tag";
import {PokemonService} from "../../../admin/services/pokemon.service";

@Component({
  selector: 'pok-pokemon-info-mobile',
  templateUrl: './pokemon-info-mobile.component.html',
  styleUrls: ['./pokemon-info-mobile.component.scss']
})
export class PokemonInfoMobileComponent implements OnInit, OnChanges {

  @Input() pokemonId: number = null
  @Output() closeMenu: EventEmitter<any> = new EventEmitter<any>()

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

  onCloseMenu() {
    this.closeMenu.emit()
  }
}


