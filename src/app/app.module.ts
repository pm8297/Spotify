import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WikiComponent } from './wiki/wiki.component'
@NgModule({
  declarations: [
    AppComponent,
    WikiComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
