import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Pokemon} from "../models/pokemon";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  API_URL = environment.API_URL
  url = 'pokemons/'

  constructor(
    private readonly http: HttpClient
  ) {
  }

  getAll(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.API_URL + this.url)
  }
}
