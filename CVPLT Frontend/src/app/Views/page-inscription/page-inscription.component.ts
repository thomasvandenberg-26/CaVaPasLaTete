
import {Component, ElementRef, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ApiService} from '../../Services/api.service';
import {Router} from '@angular/router';
import {boutonValiderFormulaire} from '../../Component/boutonValiderFormulaire/boutonValiderFormulaire';


@Component({
  selector: 'app-page-inscription',
  imports: [ReactiveFormsModule, NgIf, boutonValiderFormulaire],
  standalone: true,
  templateUrl: './page-inscription.component.html',
  styleUrl: './page-inscription.component.css'
})
export class PageInscriptionComponent{
  @ViewChild('minuscule') minuscule!: ElementRef;
  @ViewChild('majuscule') majuscule!: ElementRef;
  @ViewChild('chiffre') chiffre!: ElementRef;
  @ViewChild('speciaux') speciaux!: ElementRef;
  @ViewChild('btn') btnValiderFormulaire!: ElementRef<HTMLButtonElement>;
  passwordFocused: boolean = false;

  constructor(private apiService: ApiService,  private router: Router ) {
  }
 formGroup = new FormGroup(
   {
   type: new FormControl('',{nonNullable: true}),
   prenom: new FormControl('',{nonNullable: true}),
   nom: new FormControl('',{nonNullable: true}),
   email: new FormControl('',[Validators.required, Validators.email]),
   password: new FormControl('',[Validators.required,Validators.minLength(8)]),
   password2: new FormControl('',[Validators.required, Validators.minLength(1)] ),
 },
   {
     validators: this.passwordMatchValidator,
   }
 );
  get passwordControl(){
    return this.formGroup.controls.password;
  }
  get password2Control()
  {
    return this.formGroup.controls.password2;
  }

  isOnlySpace(formControl: FormControl | null | undefined): boolean {
    const value = formControl?.value;
    if(value == null || value === '') return false;
    return typeof value === 'string' && value.trim() === '';
  }
 isTouchedOrDirty(formControl: FormControl)
 {
   return formControl.touched || formControl.dirty;
 }
 isInvalidAndTouchedOrDirty(formControl: FormControl)
 {
   return formControl.invalid && (formControl.touched || formControl.dirty);
 }



passwordMatchValidator(control: AbstractControl)
{
  return control.get('password')?.value === control.get('password2')?.value
    ? null
    : {mismatch: true};

}

changeStyle(element: HTMLElement, color: string): void {
element.style.color=color;
}

checkPassword(pwd: FormControl): void {
  let regexMinuscule = new RegExp("^(?=.*[a-z])");
  let regexMajuscule = new RegExp("^(?=.*[A-Z])")
  let regexChiffre = new RegExp("^(?=.*[0-9])");
  let regexSpecial = new RegExp("^(?=.*[!:\/;.,?])");
  if(regexMinuscule.test(pwd.value))
  {
    this.changeStyle(this.minuscule.nativeElement,"green");
  }
  else{
    this.changeStyle(this.minuscule.nativeElement,"red");
  }
  if(regexMajuscule.test(pwd.value))
  {
    this.changeStyle(this.majuscule.nativeElement,"green");
  }
  else{
    this.changeStyle(this.majuscule.nativeElement,"red");
  }
  if(regexChiffre.test(pwd.value))
  {
    this.changeStyle(this.chiffre.nativeElement,"green");
  }
  else{
    this.changeStyle(this.chiffre.nativeElement,"red");
  }
  if(regexSpecial.test(pwd.value))
  {
    this.changeStyle(this.speciaux.nativeElement,"green");
  }
  else{
    this.changeStyle(this.speciaux.nativeElement,"red");
  }



}

 onSubmit(){
   this.formGroup.markAllAsTouched();
   const formData = this.formGroup.value;


   this.apiService.sendData(formData, '/create').subscribe({
     next: () => this.router.navigate(['/connexion']),
     error: (error) => console.error('Error:', error),
   });
 }


}
