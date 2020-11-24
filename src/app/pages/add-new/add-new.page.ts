import { Component, OnInit } from '@angular/core';
import { PickerController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { PickerOptions } from "@ionic/core";
import { DatabaseService} from './../../services/database.service';
import { Observable } from 'rxjs';
import { Recipe } from "../../../models/recipe";


@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.page.html',
  styleUrls: ['./add-new.page.scss'],
})
export class AddNewPage implements OnInit {
  types:string[] = ["Breakfast", "Lunch", "Salads", "Dinner", "Desserts", "Drinks"];
  recipes: Recipe[] = [];
  recipe = {};

  constructor(public toastController: ToastController, public pickerController: PickerController, public alertController: AlertController, private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getRecipes().subscribe(recipes => {
          this.recipes = recipes;
        })
      }
    });
  }


  addRecipe() {
    let ingridients = this.recipe['ingridients'].split(',');
    ingridients = ingridients.map(ingridient => ingridient.trim());
 
    this.db.addRecipe(this.recipe['title'], this.recipe['servings'], this.recipe['time'], ingridients, this.recipe['method'], this.recipe['pic'], this.recipe['recipeType'])
    .then(_ => {
      this.recipe = {};
    });

    this.presentToast("Recipe has been added");
  }


    async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: "success",
      position: "bottom"
    });
    toast.present();
  }

}


