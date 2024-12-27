
import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-page-inscription',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './page-inscription.component.html',
  styleUrl: './page-inscription.component.css'
})
export class PageInscriptionComponent {
 formGroup = new FormGroup({
   type: new FormControl('',{nonNullable: true}),
   prenom: new FormControl('',{nonNullable: true}),
   nom: new FormControl('',{nonNullable: true}),
   email: new FormControl('',{nonNullable: true}),
   password: new FormControl('',[Validators.required,Validators.minLength(8)]),
   password2: new FormControl(''),


 });
 isInvalidAndTouchedOrDirty(formControl: FormControl)
 {
   return formControl.invalid && (formControl.touched || formControl.dirty);
 }
 onSubmit(){
   this.formGroup.markAllAsTouched();
   console.log(this.formGroup.value);
 }
}
