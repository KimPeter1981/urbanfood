import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  fileToUpload: File = null;

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
  }

  openFile(){
    document.querySelector('input').click()
  }

  handle(files: FileList){
    this.fileToUpload = files.item(0);
    this.uploadService.fashionDiscover(this.fileToUpload).subscribe(
      data => {
        console.log(data)
      }, error => {
        console.log(error);
      }
    )
  }

}
