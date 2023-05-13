import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { InsertarComponent } from './insertar/insertar.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { FilterPipe } from './pipes/filter.pipe';
import { EditarComponent } from './editar/editar.component';
import { MovimientoPlanillaComponent } from './movimiento-planilla/movimiento-planilla.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    InsertarComponent,
    BusquedaComponent,
    FilterPipe,
    EditarComponent,
    MovimientoPlanillaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
