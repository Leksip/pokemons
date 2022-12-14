import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Pokemon, Pokemons} from '../models/pokemon';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {QueryParams} from '../models/query-params';

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

  getAll(query?: QueryParams[]): Observable<Pokemons> {
    let queryParams = ''
    if (query) {
      query.forEach((element, index) => {
        if (index > 0) {
          queryParams += '&' + element.name + '=' + element.value
        } else {
          queryParams += '?' + element.name + '=' + element.value
        }
      })
    }
    return this.http.get<Pokemons>(this.API_URL + this.url + queryParams)
  }

  remove(id: number): Observable<any> {
    return this.http.delete<any>(this.API_URL + this.url + `${id}/`)
  }

  create(pokemon: any): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.API_URL + this.url, pokemon)
  }

  update(pokemon: any, id: number): Observable<Pokemon> {
    return this.http.patch<Pokemon>(this.API_URL + this.url + `${id}/`, pokemon)
  }

  addStaticImage(file: File, id: number): Observable<any> {
    const formData = new FormData()
    formData.append('file', file)
    return this.http.post(this.API_URL + this.url + `upload-static-image/${id}/`, formData)
  }
}
