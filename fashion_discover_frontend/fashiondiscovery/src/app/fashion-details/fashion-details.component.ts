import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FashionDetailsService } from './fashion-details.service'
import {environment} from '../../environments/environment';


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
  description: string = null;

  constructor(private route: ActivatedRoute, private fashionDetailsService: FashionDetailsService) { }

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
        console.log(this.fashionPiece);
      }
    )
  }

  getFashionPiecePath(filename) {
    return this.fashionImageUrl + '/' + this.piece + '/' + filename
  }

  getFashionUpload() {
    return this.uploadImageUrl + '/' + this.fashionPiece[0].uploadfile
  }

}
