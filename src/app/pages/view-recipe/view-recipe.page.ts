import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/models/recipe';
import { RecipeService } from "src/app/services/recipe.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DatabaseService } from './../../services/database.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.page.html',
  styleUrls: ['./view-recipe.page.scss'],
})
export class ViewRecipePage implements OnInit {
  recipe: Recipe = null;
  ingridients = '';



  constructor(
    private _recipeService: RecipeService,
    public route: ActivatedRoute,
    public router: Router,
    public location: Location,
    private db: DatabaseService,
    private toast: ToastController,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let recipeId = params.get('id');
 
      this.db.getRecipe(recipeId).then(data => {
        this.recipe = data;
        this.ingridients = this.recipe.ingridients.join(', ');
      });
    });
  }

  deleteRecipe() {
    this.db.deleteRecipe(this.recipe.id).then(() => {
      this.router.navigateByUrl('/');
    });
    this.presentToast("Recipe has been deleted");
  }

  async presentToast(msg: string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      color: "success",
      position: "bottom"
    });
    toast.present();
  }


}
