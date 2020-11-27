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
    private toastController: ToastController) { }

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
    if (this.recipe['title'] && this.recipe['recipeType'] && this.recipe['ingridients'] && this.recipe['method']) {
      let ingridients = this.ingridients.split(',');
      ingridients = ingridients.map(ingridient => ingridient.trim());
      this.recipe.ingridients = ingridients;
      if (!this.recipe['servings']) {
        this.recipe['servings'] = 0;
      }
      if (!this.recipe['time']) {
        this.recipe['time'] = 0;
      }
      this.db.updateRecipe(this.recipe);
      this.presentToast("Recipe has been updated", "success");
      this.location.back();
    }  else {
      this.presentToast("Required fields cannot be empty", "danger");
    }
  }

    
  async presentToast(msg: string, clr: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: clr,
      position: "bottom"
    });
    toast.present();
  }
    

}