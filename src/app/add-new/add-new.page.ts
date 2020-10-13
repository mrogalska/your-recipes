import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.page.html',
  styleUrls: ['./add-new.page.scss'],
})
export class AddNewPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loadImageFromDevice(event) {

    const file = event.target.files[0];
  
    const reader = new FileReader();
  
    reader.readAsArrayBuffer(file);
  
    reader.onload = () => {
  
      // get the blob of the image:
      let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
  
      // create blobURL, such that we could use it in an image element:
      let blobURL: string = URL.createObjectURL(blob);
  
    };
  
    reader.onerror = (error) => {
  
      //handle errors
  
    };
  };


}
