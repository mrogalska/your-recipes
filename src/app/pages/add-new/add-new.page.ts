import { Component, OnInit } from '@angular/core';
import { PickerController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { DatabaseService} from './../../services/database.service';
import { Recipe } from "../../../models/recipe";
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.page.html',
  styleUrls: ['./add-new.page.scss'],
})

export class AddNewPage implements OnInit {
  types:string[] = ["Breakfast", "Lunch", "Salads", "Dinner", "Desserts", "Drinks"];
  recipes: Recipe[] = [];
  recipe = {};

  constructor(
    public toastController: ToastController, 
    public pickerController: PickerController, 
    public alertController: AlertController, 
    private db: DatabaseService, 
    public location: Location
    ) { }


  /**
   * Get recipes from the database on ngOnInit
   */
  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getRecipes().subscribe(recipes => {
          this.recipes = recipes;
        })
      }
    });
  }


/**
 * Checking if required fields are not missing and adding recipe to the database
 */
addRecipe() {
  if (this.recipe['title'] && this.recipe['recipeType'] && this.recipe['ingridients'] && this.recipe['method']) {
      let ingridients = this.recipe['ingridients'].split(',');
      ingridients = ingridients.map(ingridient => ingridient.trim());
      if (!this.recipe['servings']) {
        this.recipe['servings'] = 0;
      }
      if (!this.recipe['time']) {
        this.recipe['time'] = 0;
      }
      this.db.addRecipe(this.recipe['title'], this.recipe['servings'], this.recipe['time'], ingridients, this.recipe['method'], this.recipe['pic'], this.recipe['recipeType'])
      .then(_ => {
        this.recipe = {};
      });
    this.presentToast("Recipe has been added", "success");
  } else {
    this.presentToast("Required fields cannot be empty", "danger");
  }
}

/**
 * Displaying toast with notification about successful/ unsuccessful action
 * 
 * @param msg message to display
 * @param clr color of displayed message
 */
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


