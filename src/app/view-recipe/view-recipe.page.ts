import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/models/recipe';
import { RecipeService } from "src/app/services/recipe.service";
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.page.html',
  styleUrls: ['./view-recipe.page.scss'],
})
export class ViewRecipePage implements OnInit {
  recipes: Recipe[];
  id: string = "";
  recipeId: number = 0;
  selectedRecipe: Recipe;


  constructor(
    private _recipeService: RecipeService,
    public route: ActivatedRoute,
    public router: Router,
    public location: Location
  ) { }

  ngOnInit() {
    this.getRecipes();
    this.getSelectedRecipe();
  }


  getRecipes(): void {
    this._recipeService.getRecipes()
        .subscribe(recipes => this.recipes = recipes);
  }

  getSelectedRecipe(): void {
    this.id = this.router.url.slice(13);
    this.recipeId = parseInt(this.id);
    let item = this.recipes.find(i => i.id === this.recipeId);
    this.selectedRecipe = item
    console.log(this.selectedRecipe);
  }

}
