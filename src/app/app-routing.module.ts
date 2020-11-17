import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-recipes/Breakfast',
    pathMatch: 'full'
  },
  {
    path: 'all-recipes/:id',
    loadChildren: () => import('./pages/all-recipes/all-recipes.module').then( m => m.AllRecipesPageModule)
  },
  {
    path: 'add-new',
    loadChildren: () => import('./pages/add-new/add-new.module').then( m => m.AddNewPageModule)
  },
  {
    path: 'view-recipe/:id',
    loadChildren: () => import('./pages/view-recipe/view-recipe.module').then( m => m.ViewRecipePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
