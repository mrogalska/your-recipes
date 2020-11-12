import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.page.html',
  styleUrls: ['./add-new.page.scss'],
})
export class AddNewPage implements OnInit {
  url: string | ArrayBuffer;
  ingridientsAmount: number = 0;
  ingridientArr: any[];

  constructor(public toastController: ToastController) { }

  ngOnInit() {}


  // allows to preview selected photo

  onSelectFile(event): void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.url = event.target.result;
      }
    }
  }


  //  checking if provided amount of ingridients is positive
  //  integer

  //  TODO: user will choose number of ingridients in recipe
  //  and function will create bullet list with proper amount
  //  of space for ingridients

  checkIfInteger(event): void {
    this.ingridientsAmount = Number(event.target.value);
    if(this.ingridientsAmount <= 0 || !Number.isInteger(this.ingridientsAmount)) {
      this.presentToast();
      event.target.class;
      event.target.style.color = "#ff4961";
     } else {
      event.target.style.color = "#f4f5f8";

      // not finished
      var arr = new Array(this.ingridientsAmount)
      for(var i = 0; i < arr.length; i++) {
        arr[i] = "•";
      }
      console.log(arr);
    }
  }


  // toast notificiation warning that provided number is not
  // positive integer

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Please provide a postive integer',
      duration: 2000,
      color: "danger",
      position: "bottom"
    });
    toast.present();
  }

}


