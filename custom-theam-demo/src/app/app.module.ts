import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule,
  MatInputModule,MatSidenavModule,MatTooltipModule,MatTabsModule,
  MatFormFieldModule,MatSelectModule ,MatExpansionModule,
  MatPaginatorModule, MatProgressSpinnerModule, 
  MatSortModule, MatTableModule} from '@angular/material';
import {MatDialogModule} from '@angular/material';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoginComponent } from './login/login.component';
import { LogOnComponent } from './login/log-on/log-on.component';
import { NewLoginComponent } from './login/new-login/new-login.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LoginListComponent } from './login/login-list/login-list.component';
import { UpdateLoginComponent } from './login/update-login/update-login.component';
import { OrderComponentComponent } from './order-component/order-component.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogOnComponent,
    NewLoginComponent,
    LoginListComponent,
    UpdateLoginComponent,
    OrderComponentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
    MatInputModule,
    MatSidenavModule,
    MatTooltipModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    HttpModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    UpdateLoginComponent,
]
})
export class AppModule { }
