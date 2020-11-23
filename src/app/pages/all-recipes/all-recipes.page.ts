import { DatabaseService} from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/models/recipe';
import { RecipeService } from "src/app/services/recipe.service";

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.page.html',
  styleUrls: ['./all-recipes.page.scss'],
})
export class AllRecipesPage implements OnInit {
  public recipeType: string;
  recipes: Recipe[] = [];

  constructor(
    private _recipeService: RecipeService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _db: DatabaseService
    ) { }

  ngOnInit() {
    this._db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this._db.getRecipes().subscribe(recipes => {
          this.recipes = recipes;
        })
      }
    });
  }


}
