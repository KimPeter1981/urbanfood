import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './header/header.component';
import { UploadComponent } from './upload/upload.component';
import { UploadService } from './upload/upload.service';
import { FashionService } from './fashion-display/fashion.service'
import { FashionDetailsService } from './fashion-details/fashion-details.service'
import { HttpClientModule } from '@angular/common/http';
import { FashionDisplayComponent } from './fashion-display/fashion-display.component';
import { FashionDetailsComponent } from './fashion-details/fashion-details.component';
import { FashionSuggestComponent } from './fashion-suggest/fashion-suggest.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UploadComponent,
    FashionDisplayComponent,
    FashionDetailsComponent,
    FashionSuggestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UploadService, FashionService, FashionDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
