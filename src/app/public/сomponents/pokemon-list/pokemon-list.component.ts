import {Component, HostListener, OnInit} from '@angular/core';
import {PokemonService} from "../../../admin/services/pokemon.service";
import {Pokemon} from "../../../admin/models/pokemon";
import {Tag} from "../../../admin/models/tag";
import {debounceTime, fromEvent, map, Observable} from 'rxjs';
import {QueryParams} from '../../../admin/models/query-params';

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
  isLoading = false
  query: QueryParams[] = []
  pokemons: Pokemon[] = []
  tagColor: string
  selectedPokemonId: number
  windowWidth:number

  constructor(
    private readonly pokemonService: PokemonService,
  ) {
  }

  ngOnInit(): void {
    const search$: Observable<Event> = fromEvent<Event>(
      document.getElementById('search'),
      'input'
    )
    search$.pipe(
      map(event => {
        this.isLoading = true
        return (event.target as HTMLInputElement).value
      }),
      debounceTime(500),
    ).subscribe(input => {
      console.log(input)
      this.query = [{name: 'name', value: input}]
      this.pokemonService.getAll(this.query).subscribe(pokemons => {
        this.pokemons = pokemons
        this.isLoading = false
      })
    })

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

