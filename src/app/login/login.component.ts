import { Component } from '@angular/core';
import { EmisorService } from '../shared/emisor.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';  
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  emisores: any;
  selectedEmisor: string;
  mensajeError: any;
  username!: string;  
  password!: string; 
  emisorComp: any; 
  logoUrl:any;
   
  constructor(private http: HttpClient,private sanitizer: DomSanitizer,private emisorService: EmisorService,private router: Router) { 
    this.selectedEmisor= '';
    this.logoUrl = this.sanitizer.bypassSecurityTrustUrl('assets/img/logo-taller.svg');  
    

  }

  onlyNumbers(event: KeyboardEvent) {
    const input = event.key;
    const isNumber = /^[0-9]+$/.test(input);
    const isAllowedKey = event.code === 'Backspace' || event.code === 'Delete' || event.code === 'Tab';
  
    if (!isNumber && !isAllowedKey) {
      event.preventDefault();
    }
  }

  ngOnInit() {
    this.http.get<any>('api/ControladorAPI/api/v1/emisores')
      .subscribe((data: any[]) => {
        this.emisores = data.map(emisor => emisor.NombreEmisor);
      });
      
  }
  

  onChangeEmisor(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedIndex = target.selectedIndex;
    const emisorId = target.options[selectedIndex].value;
    const emisorNombre = target.options[selectedIndex].textContent;
    this.emisorComp = emisorNombre;
    this.selectedEmisor = emisorId;
  }

  onSubmit() {


    if (!this.username || !this.password || !this.emisorComp) {
      Swal.fire('¡Error!');
      return;
    }
    else{
      const loginData = {
        usuario: this.username,
        contrasena: this.password
      };
      
      
      this.http.post('/api/ControladorAPI/login', loginData)
        .subscribe(response => {
          
        const data = JSON.stringify(response);
        const responseObj = JSON.parse(data);
          
        const emisorData = {
        nombre: responseObj[0].NOMBREEMISOR,
        ruc: responseObj[0].RucUsuario,
      };
      if (this.emisorComp === emisorData.nombre) {
        Swal.fire('Inicio exitoso!');
        this.emisorService.updateEmisorData(emisorData);
        this.router.navigate(['/home']); // aquí se navega a la ruta /home
  
      } else {
        // mostrar mensaje de error o hacer otra acción
        Swal.fire('¡Error!');
        
      }
  
  
        }, error => {
          console.log(error);
          Swal.fire('¡Error!');
        });
    }
  
    
    
  }
  
  
  
}