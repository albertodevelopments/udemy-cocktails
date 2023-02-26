import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICocktail } from '../interfaces/icocktail';
import { IFilter } from '../interfaces/ifilter';
import {Observable} from 'rxjs'

import { Cocktail } from '../models/cocktail.model';
import { map } from 'rxjs/operators';
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  constructor(private http: HttpClient) { }

  getCocktailFilter(filter: IFilter){
    let urlBase = 'https://www.thecocktaildb.com/api/json/v1/1/'
    let additionalUrl = ''

    if(filter.searchBy === 'name'){
      additionalUrl = 'search.php?s=' + filter.value
    }else{
      additionalUrl = 'filter.php?'
      if(filter.searchBy === 'glass') {
        additionalUrl += 'g='
      }else if(filter.searchBy === 'category'){
        additionalUrl += 'c='
      }else{
        additionalUrl += 'i='
      }

      additionalUrl += filter.value
    }

    const finalUrl = urlBase + additionalUrl

    return this.http.get(finalUrl).pipe(
      map(data => this.parseData(_.get(data, 'drinks')))
    )
  }

  getCocktailById(id: string){
    return this.http.get("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id).pipe(
      map(data => {
        const list = this.parseData(_.get(data, 'drinks'))
        return list[0]
      })
    )
  }

  private parseData(listCocktails: Cocktail[]): Cocktail[]{
    let newListCocktails: Cocktail[] = []

    _.forEach(listCocktails, c => {
      let cocktail = new Cocktail(c)

      newListCocktails.push(cocktail)
    })

    
    return newListCocktails
  }
}
