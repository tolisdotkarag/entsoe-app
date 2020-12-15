import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsComponent } from './charts/charts.component';
import { OutputGraphComponent } from './output-graph/output-graph.component';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    OutputGraphComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgxCsvParserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
