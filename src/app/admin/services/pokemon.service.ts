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

  getById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.API_URL + this.url + `${id}/`)
  }

  getAll(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.API_URL + this.url)
  }

  remove(id: number): Observable<any> {
    return this.http.delete<any>(this.API_URL + this.url + `${id}/`)
  }

  create(pokemon: any): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.API_URL + this.url, pokemon)
  }

  update(pokemon: any, id: number): Observable<Pokemon> {
    return this.http.put<Pokemon>(this.API_URL + this.url + `${id}/`, pokemon)
  }

}
