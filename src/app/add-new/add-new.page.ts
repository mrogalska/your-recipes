import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.page.html',
  styleUrls: ['./add-new.page.scss'],
})
export class AddNewPage implements OnInit {
  // photo URL
  url: string | ArrayBuffer;
  // variable for checking if provided time or number of servings is positive integer
  elementsAmount: number = 0;
  // adds empty space for providing ingridient
  newIngridient: string;
  // list of ingridients
  ingridientList: string[] = [];

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


  //  checking if provided number is positive
  //  integer

  checkIfInteger(event): void {
    this.elementsAmount = Number(event.target.value);
    if(this.elementsAmount <= 0 || !Number.isInteger(this.elementsAmount)) {
      this.presentToast();
      event.target.class;
      event.target.style.color = "#ff4961";
     } else {
      event.target.style.color = "#f4f5f8";
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


  // add item to an ingridient list
  addItem(){    
    this.ingridientList.push(this.newIngridient);
    this.newIngridient = "";
  }

  // delete item from an ingridient list
  deleteItem(i){
    this.ingridientList.splice(i, 1);
  }

}


