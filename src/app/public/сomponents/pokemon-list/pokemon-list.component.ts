import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import {PokemonService} from '../../../admin/services/pokemon.service';
import {Pokemon} from '../../../admin/models/pokemon';
import {Tag} from '../../../admin/models/tag';
import {debounceTime, fromEvent, map, Observable} from 'rxjs';
import {QueryParams} from '../../../admin/models/query-params';
import {ScrollPositionService} from '../../../admin/shared/services/scroll-position.service';

@Component({
  selector: 'pok-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  @HostListener('window:resize')
  resize() {
    this.windowWidth = window.innerWidth;
  }

  offset: number = 0;
  listenerScroll: any; // событие дозагрузки
  isPending = false;
  isLoading = false;
  query: QueryParams[] = [
    {name: 'limit', value: 20},
    {name: 'offset', value: this.offset}
  ];
  searchResult: string = '';
  pokemons: Pokemon[] = [];
  pokemonsCount: number = 0;
  tagColor: string;
  selectedPokemonId: number;
  windowWidth: number;

  constructor(
    private readonly pokemonService: PokemonService,
    private renderer2: Renderer2,
    private scrollPositionService: ScrollPositionService
  ) {
  }

  ngOnInit(): void {
    const search$: Observable<Event> = fromEvent<Event>(
      document.getElementById('search'),
      'input'
    );
    search$.pipe(
      map(event => {
        this.isLoading = true;
        return (event.target as HTMLInputElement).value;
      }),
      debounceTime(500),
    ).subscribe(input => {
      this.pokemons = [];
      this.offset = 0;
      this.searchResult = input;
      this.getPokemons();
    });

    this.getPokemons();

    this.listenerScroll = this.lazyLoad();
  }

  onSelectPokemon(id: number, tags: Tag[]) {
    if (this.selectedPokemonId === id) {
      this.selectedPokemonId = null;
      this.tagColor = '';
    } else
      this.selectedPokemonId = id;
    this.tagColor = tags[0].color;
    if (this.windowWidth <= 1100) {
      document.body.style.overflow = 'hidden';
    }

  }

  closeMenu() {
    this.selectedPokemonId = null;
    document.body.style.overflow = '';
  }

  getPokemons() {
    this.isLoading = true;
    this.isPending = true;
    this.query = [
      {name: 'limit', value: 20},
      {name: 'offset', value: this.offset}
    ];
    if (this.searchResult) {
      this.query.push({name: 'name', value: this.searchResult});
    }
    this.pokemonService.getAll(
      this.query
    ).subscribe(
      response => {
        this.pokemonsCount = response.count
        this.pokemons = [...this.pokemons, ...response.pokemons];
        this.isPending = false;
        this.isLoading = false;
      }
    );
  }

  lazyLoad(): () => void {
    return this.renderer2.listen('window', 'scroll', (e) => {
      this.screenMoving();
      if (this.isPending ) {
        return;
      }
      const unVisible = e.target.body.scrollHeight - window.innerHeight;
      if ((unVisible - window.scrollY) < 200) {
        this.offset += 21;
        if (this.offset < this.pokemonsCount) {
          this.getPokemons();
        }
      }
    });
  }

  screenMoving(): void {
    const scrollPosition = this.scrollPositionService.getScrollPosition();
    if (!scrollPosition) {
      return;
    }
    const currentPosition = document.documentElement.scrollTop;
    const range = [scrollPosition - 200, scrollPosition + 200];
    if (currentPosition >= range[0] && currentPosition <= range[1] && currentPosition !== 0) {
      this.scrollPositionService.removeScrollPosition(500);
    }
  }
}

