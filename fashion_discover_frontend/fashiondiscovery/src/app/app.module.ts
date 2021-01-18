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
import { HttpClientModule } from '@angular/common/http';
import { FashionDisplayComponent } from './fashion-display/fashion-display.component';
import { FashionDetailsComponent } from './fashion-details/fashion-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UploadComponent,
    FashionDisplayComponent,
    FashionDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UploadService, FashionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
