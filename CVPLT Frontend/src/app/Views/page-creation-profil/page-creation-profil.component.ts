import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import  {ApiService} from '../../Services/api.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../Models/User';


@Component({
  selector: 'app-page-creation-profil',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './page-creation-profil.component.html',
})
export class PageCreationProfilComponent implements OnInit{

  userId: number= 0;
  userStorageId: string = "";
  userFirstName: string = "";
  userLastName: string | null = "";
constructor(private apiService : ApiService, private router : Router, private route: ActivatedRoute) {
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

  ngOnInit() {
    console.log("on init creation")
    this.userStorageId = this.userStorageId + localStorage.getItem("userId");
    this.apiService.getUserFirstName(this.userStorageId)
      .subscribe(
        prenom => {this.userFirstName = this.userFirstName + prenom; }
      );

    this.apiService.getUserLastName(this.userStorageId)
      .subscribe(
      nom=> { this.userLastName = this.userLastName + nom.toUpperCase(); }
    )

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
