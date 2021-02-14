import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fashion-suggest',
  templateUrl: './fashion-suggest.component.html',
  styleUrls: ['./fashion-suggest.component.css']
})
export class FashionSuggestComponent implements OnInit {

  uuid: string = null;
  piece: string = null;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.uuid = routeParams.get('id');
    this.piece = routeParams.get('piece');
  }

}
