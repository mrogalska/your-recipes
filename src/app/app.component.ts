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
      url: '/folder/Breakfast',
      icon: 'nutrition'
    },
    {
      title: 'Lunch',
      url: '/folder/Lunch',
      icon: 'fast-food'
    },
    {
      title: 'Salads',
      url: '/folder/Salads',
      icon: 'leaf'
    },
    {
      title: 'Dinner',
      url: '/folder/Dinner',
      icon: 'restaurant'
    },
    {
    title: 'Desserts',
    url: '/folder/Desserts',
    icon: 'ice-cream'
    },
    {
      title: 'Drinks',
      url: '/folder/Drinks',
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
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
