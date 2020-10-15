import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.page.html',
  styleUrls: ['./add-new.page.scss'],
})
export class AddNewPage implements OnInit {
  url: string | ArrayBuffer;
  ingridientsAmount: number;

  constructor(public toastController: ToastController) { }

  ngOnInit() {}


  onSelectFile(event): void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.url = event.target.result;
      }
    }
  }

  checkIfInteger(event): void {
    this.ingridientsAmount = Number(event.target.value);
    if(this.ingridientsAmount <= 0 || !Number.isInteger(this.ingridientsAmount)) {
      this.presentToast();
      event.target.class;
      event.target.style.color = "#ff4961";
     } else {
      event.target.style.color = "#f4f5f8";
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Please provide a postive integer',
      duration: 2000,
      color: "danger"
    });
    toast.present();
  }

}


