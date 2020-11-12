import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recipe } from 'src/models/recipe';
import { RecipeType } from "src/models/recipe-type";
import { RECIPES } from "src/app/mocks/mock-recipes";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }

  getRecipes(): Observable<Recipe[]> {
    return of (RECIPES);
  }
}
