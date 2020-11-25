import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { Recipe } from 'src/models/recipe';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.page.html',
  styleUrls: ['./update-recipe.page.scss'],
})
export class UpdateRecipePage implements OnInit, OnChanges {
  recipe: Recipe = null;
  ingridients = '';
  types:string[] = ["Breakfast", "Lunch", "Salads", "Dinner", "Desserts", "Drinks"];

  constructor( 
    public route: ActivatedRoute,
    public router: Router,
    public location: Location,
    private db: DatabaseService,
    private toast: ToastController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let recipeId = params.get('id');
 
      this.db.getRecipe(recipeId).then(data => {
        this.recipe = data;
        this.ingridients = this.recipe.ingridients.join(', ');
      });
    });
    }
    ngOnChanges() {
      this.route.paramMap.subscribe(params => {
        let recipeId = params.get('id');
   
        this.db.getRecipe(recipeId).then(data => {
          this.recipe = data;
          this.ingridients = this.recipe.ingridients.join(', ');
        });
      });
    }


  updateRecipe() {
    let ingridients = this.ingridients.split(',');
    ingridients = ingridients.map(ingridient => ingridient.trim());
    this.recipe.ingridients = ingridients;
 
    this.db.updateRecipe(this.recipe).then(async (res) => {
      let toast = await this.toast.create({
        message: 'Recipe has been updated',
        color: "success",
        duration: 3000
      });
      toast.present();
    });
    this.location.back();
  }

}