import { Component, OnInit } from '@angular/core';
import { FashionService } from './fashion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fashion-display',
  templateUrl: './fashion-display.component.html',
  styleUrls: ['./fashion-display.component.css']
})
export class FashionDisplayComponent implements OnInit {

  public fashionDiscoveryResponse: any = null;

  public uuid: string = null;

  constructor(private fashionService: FashionService, private router: Router) { }

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
    return this.fashionService.getUploadedFile(uploadfile);
  }

  fashionPartFile(uploadedFile: string): string {
    return this.fashionService.getFashionPart(uploadedFile);
  }

  goBack() {
    localStorage.setItem('uuid','');
    this.router.navigateByUrl('/');
  }

}
