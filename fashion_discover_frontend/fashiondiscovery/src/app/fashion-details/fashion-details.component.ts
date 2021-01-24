import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FashionDetailsService } from './fashion-details.service'
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';


@Component({
  selector: 'app-fashion-details',
  templateUrl: './fashion-details.component.html',
  styleUrls: ['./fashion-details.component.css']
})
export class FashionDetailsComponent implements OnInit {

  fashionImageUrl = `${environment.fasionImageUrl}`;
  uploadImageUrl = `${environment.uploadImageUrl}`

  uuid: string = null;
  piece: string = null;
  fashionPiece: any = null;
  description: string = '';

  constructor(private route: ActivatedRoute, 
              private fashionDetailsService: FashionDetailsService,
              private router: Router) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.uuid = routeParams.get('id');
    this.piece = routeParams.get('piece');
    this.getFashionPiece();
  }

  getFashionPiece(): void {
    this.fashionDetailsService.getFashionPiece(this.uuid, this.piece).subscribe(
      data => {
        this.fashionPiece = data;
        if (this.fashionPiece[0].description) {
          this.description = this.fashionPiece[0].description;
        }
      }
    )
  }

  getFashionPiecePath(filename) {
    return this.fashionImageUrl + '/' + this.piece + '/' + filename
  }

  getFashionUpload() {
    return this.uploadImageUrl + '/' + this.fashionPiece[0].uploadfile
  }

  gotoDisplay() {
    this.fashionDetailsService.saveDescription(this.uuid, this.piece, this.description).subscribe(
      data => {
        this.router.navigateByUrl('/display');
      }
    )
  }

}
