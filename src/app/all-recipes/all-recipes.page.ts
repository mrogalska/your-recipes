import { Component, OnInit } from '@angular/core';
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
  recipes: Recipe[];

  constructor(
    private _recipeService: RecipeService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
    this.recipeType = this._activatedRoute.snapshot.paramMap.get('id');
    this.getRecipes();

  }

  getRecipes(): void {
    this._recipeService.getRecipes()
        .subscribe(recipes => this.recipes = recipes);
  }


}
