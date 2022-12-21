import {Component, HostListener, OnInit} from '@angular/core';
import {PokemonService} from "../../../admin/services/pokemon.service";
import {Pokemon} from "../../../admin/models/pokemon";
import {Tag} from "../../../admin/models/tag";

@Component({
  selector: 'pok-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  @HostListener('window:resize')
  resize(){
    this.windowWidth = window.innerWidth
  }

  pokemons: Pokemon[] = []
  tagColor: string
  selectedPokemonId: number
  windowWidth:number

  constructor(
    private readonly pokemonService: PokemonService,
  ) {
  }

  ngOnInit(): void {
    this.windowWidth = window.innerWidth
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
    if (this.windowWidth <=1100){
      document.body.style.overflow = 'hidden'
    }

  }

  closeMenu() {
    this.selectedPokemonId = null
    document.body.style.overflow = ''
  }
}
