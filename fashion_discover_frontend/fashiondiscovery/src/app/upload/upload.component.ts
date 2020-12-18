import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  fileToUpload: File = null;

  public fashionDiscoveryResponse: any = null;

  public uuid: string = null;

  public loader: boolean = false;

  constructor(private uploadService: UploadService, private router: Router) { }

  ngOnInit(): void {}

  openFile(){
    document.querySelector('input').click()
  }

  handle(files: FileList){
    this.loader = true;
    this.fileToUpload = files.item(0);
    this.uploadService.fashionDiscover(this.fileToUpload).subscribe(
      data => {
        this.fashionDiscoveryResponse = data;
        localStorage.setItem('uuid', this.fashionDiscoveryResponse.uuid);
        this.loader = false;
        this.router.navigateByUrl('/display');
      }, error => {
        console.log(error);
      }
    )
  }

  clear() {
    localStorage.setItem('uuid', '');
  }

}
