import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';
import { FashionService } from './fashion.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  fileToUpload: File = null;

  public fashionDiscoveryResponse: any = null;

  public uuid: string = null;

  constructor(private uploadService: UploadService, private fashionService: FashionService) { }

  ngOnInit(): void {
    this.uuid = localStorage.getItem('uuid');
    if ((this.uuid !== null) && (this.uuid !== '')) {
      this.fashionService.getFashionItems(this.uuid).subscribe(
        data => {
          this.fashionDiscoveryResponse = data;
        }
      )
    }
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
        localStorage.setItem('uuid', this.fashionDiscoveryResponse.uuid);
      }, error => {
        console.log(error);
      }
    )
  }

}
