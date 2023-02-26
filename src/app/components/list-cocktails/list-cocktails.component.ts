import { Component, OnInit } from '@angular/core';
import { IFilter } from 'src/app/interfaces/ifilter';
import { CocktailService } from 'src/app/services/cocktail.service';
import { Cocktail } from 'src/app/models/cocktail.model';

@Component({
  selector: 'app-list-cocktails',
  templateUrl: './list-cocktails.component.html',
  styleUrls: ['./list-cocktails.component.css']
})
export class ListCocktailsComponent implements OnInit {

  public showFilter: boolean
  public listCocktails: Cocktail[]
  public loadCocktails: boolean

  public filter: IFilter

  public items: number
  public page: number

  constructor(private cocktailService: CocktailService) {
    this.showFilter = true
    this.filter = {
      'searchBy': 'name',
      'value': '' 
    }
    this.listCocktails = [];
    this.loadCocktails = true;
    this.items = 12
    this.page = 1 
   }

  ngOnInit(): void {
  }

  hideShowFilter(): void{
    this.showFilter = !this.showFilter
  }

  filterData(): void{
    this.loadCocktails = false
    this.cocktailService.getCocktailFilter(this.filter).subscribe(cocktails => {
      this.listCocktails = cocktails
        this.loadCocktails = true
    })
  }

}
