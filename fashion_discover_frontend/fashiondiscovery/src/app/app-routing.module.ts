import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UploadComponent} from './upload/upload.component'
import {FashionDisplayComponent} from './fashion-display/fashion-display.component'
import {FashionDetailsComponent} from './fashion-details/fashion-details.component'

const routes: Routes = [{path: '', component: UploadComponent},
                        {path: 'display', component: FashionDisplayComponent},
                        {path: 'details/:id/:piece', component: FashionDetailsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
