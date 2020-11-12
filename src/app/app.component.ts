import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Breakfast',
      url: '/all-recipes/Breakfast',
      icon: 'nutrition'
    },
    {
      title: 'Lunch',
      url: '/all-recipes/Lunch',
      icon: 'fast-food'
    },
    {
      title: 'Salads',
      url: '/all-recipes/Salads',
      icon: 'leaf'
    },
    {
      title: 'Dinner',
      url: '/all-recipes/Dinner',
      icon: 'restaurant'
    },
    {
    title: 'Desserts',
    url: '/all-recipes/Desserts',
    icon: 'ice-cream'
    },
    {
      title: 'Drinks',
      url: '/all-recipes/Drinks',
      icon: 'wine'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('all-recipes/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
