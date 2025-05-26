
import {Observable} from 'rxjs';

export class User{
 id: number; 
 password: string;
  email: string;
  prenom: string; 
  nom: string
 constructor(  id: number, email: string, password: string, prenom: string, nom: string) {
   this.id = id;
   this.password = password;
   this.email = email;
   this.prenom = prenom; 
   this.nom = nom; 

 }


}
