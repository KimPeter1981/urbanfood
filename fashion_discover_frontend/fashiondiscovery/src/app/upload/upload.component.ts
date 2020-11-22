import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  fileToUpload: File = null;

  public fashionDiscoveryResponse: any = null;

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
  }

  uploadedFile(uploadfile: string): string {
    return this.uploadService.getUploadedFile(uploadfile);
  }

  fashionPartFile(uploadedFile: string): string {
    return this.uploadService.getFashionPart(uploadedFile);
  }

  openFile(){
    document.querySelector('input').click()
  }

  handle(files: FileList){
    this.fileToUpload = files.item(0);
    this.uploadService.fashionDiscover(this.fileToUpload).subscribe(
      data => {
        this.fashionDiscoveryResponse = data;
        console.log(this.fashionDiscoveryResponse.uploadfile);
      }, error => {
        console.log(error);
      }
    )
  }

}
