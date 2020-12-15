import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UploadComponent} from './upload/upload.component'
import {FashionDisplayComponent} from './fashion-display/fashion-display.component'

const routes: Routes = [{path: '', component: UploadComponent},
                        {path: 'display', component: FashionDisplayComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
