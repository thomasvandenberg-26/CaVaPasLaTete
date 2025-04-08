import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import  {ApiService} from '../../Services/api.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-page-creation-profil',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './page-creation-profil.component.html',
  styleUrl: './page-creation-profil.component.css'
})
export class PageCreationProfilComponent {
constructor(private apiService : ApiService, private router : Router) {
}
  selectedFile: File | null = null;
  imagePreview: string | null= null;
  initialPicture = 'https://png.pngtree.com/png-vector/20220907/ourmid/pngtree-camera-icon-design-png-image_6141281.png';



  formGroup = new FormGroup({
    photoProfil: new FormControl('', {nonNullable: true}),
    specialite: new FormControl('', {nonNullable: true}),
    localite: new FormControl('', {nonNullable: true}),
    description: new FormControl('', {nonNullable: true}),
  })

  handleImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if(file && file.type === 'image/jpeg' || file && file.type === 'image/png') {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    }
  }
  onSubmit() {

    const formData = this.formGroup.value;

    this.apiService.sendDataProfil(formData,"users/profile" ).subscribe(
      {
        next : (response) => this.router.navigate(['/profile']),
        error : (error) => console.error('Error:', error),
      }

    )
  }
}
