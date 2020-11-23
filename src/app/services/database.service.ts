import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recipe } from "../../models/recipe";
 
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
 
  recipes = new BehaviorSubject([]);
 
  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'recipes5.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
      });
    });
  }
 
  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadRecipes();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }
 
  getDatabaseState() {
    return this.dbReady.asObservable();
  }
 
  getRecipes(): Observable<Recipe[]> {
    return this.recipes.asObservable();
  }
 


  loadRecipes() {
    return this.database.executeSql('SELECT * FROM recipe', []).then(data => {
      let recipes: Recipe[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          let ingridients = [];
          if (data.rows.item(i).ingridients != '') {
            ingridients = JSON.parse(data.rows.item(i).ingridients);
          }
 
          recipes.push({ 
            id: data.rows.item(i).id,
            title: data.rows.item(i).title,
            servings: data.rows.item(i).servings, 
            time: data.rows.item(i).time, 
            ingridients: ingridients, 
            method: data.rows.item(i).method,
            pic: data.rows.item(i).pic,
            recipeType: data.rows.item(i).recipeType
           });
        }
      }
      this.recipes.next(recipes);
    });
  }
 
  addRecipe(title, servings, time, ingridients, method, pic, recipeType) {
    let data = [title, servings, time, JSON.stringify(ingridients), method, pic, recipeType];
    return this.database.executeSql('INSERT INTO recipe (title, servings, time, ingridients, method, pic, recipeType) VALUES (?, ?, ?, ?, ?, ?, ?)', data).then(data => {
      this.loadRecipes();
    });
  }
 
  getRecipe(id): Promise<Recipe> {
    return this.database.executeSql('SELECT * FROM recipe WHERE id = ?', [id]).then(data => {
      let ingridients = [];
      if (data.rows.item(0).ingridients != '') {
        ingridients = JSON.parse(data.rows.item(0).ingridients);
      }
 
      return {
        id: data.rows.item(0).id,
        title: data.rows.item(0).title, 
        servings: data.rows.item(0).servings, 
        time: data.rows.item(0).time,
        ingridients: ingridients, 
        method: data.rows.item(0).method,
        pic: data.rows.item(0).pic,
        recipeType: data.rows.item(0).recipeType
      }
    });
  }
 
  deleteRecipe(id) {
    return this.database.executeSql('DELETE FROM recipe WHERE id = ?', [id]).then(_ => {
      this.loadRecipes();
    });
  }
 
  updateRecipe(recipe: Recipe) {
    let data = [recipe.title, recipe.servings, recipe.time, JSON.stringify(recipe.ingridients), recipe.method, recipe.pic, recipe.recipeType];
    return this.database.executeSql(`UPDATE recipe SET title = ?, servings = ?, time = ?, ingridients = ?, method = ?, pic = ?, recipeType = ? WHERE id = ${recipe.id}`, data).then(data => {
      this.loadRecipes();
    })
  }
 

}