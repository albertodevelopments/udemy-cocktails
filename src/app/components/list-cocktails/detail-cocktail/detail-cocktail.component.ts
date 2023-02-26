import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cocktail } from 'src/app/models/cocktail.model';
import { CocktailService } from 'src/app/services/cocktail.service';

@Component({
  selector: 'app-detail-cocktail',
  templateUrl: './detail-cocktail.component.html',
  styleUrls: ['./detail-cocktail.component.css']
})
export class DetailCocktailComponent implements OnInit {

  public cocktail: Cocktail
  public loadCocktail: boolean

  constructor(
      private cocktailService: CocktailService,
      private route: ActivatedRoute
      ) { 
    this.cocktail = null
    this.loadCocktail = false
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id']
      this.cocktailService.getCocktailById(id).subscribe(c => {
        this.cocktail = c

        console.log(this.cocktail)
        this.loadCocktail = true
      }, error => {
        console.log(error)
      })
    }, error => {
      console.log(error)
    })
  }

}
