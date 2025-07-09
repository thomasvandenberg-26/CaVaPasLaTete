import {Component, ViewChild, ElementRef, Input, OnInit} from '@angular/core';
import { FormGroup} from '@angular/forms';


@Component({
  selector: 'btnValiderFormulaire',
  imports : [],
  template:
    '      <button #btn type="submit" id="valider" class=" bg-gray-300 w-40 self-center  text-xl text-bleucanard  rounded-xl"> Valider</button>'
})
export class boutonValiderFormulaire implements OnInit {

  @Input() formGroup!: FormGroup;
  @ViewChild('btn') btn!: ElementRef<HTMLButtonElement>;

  ngOnInit(): void {

    console.log("test gris bouton")
      this.formGroup.valueChanges.subscribe(() => {
        if(this.formGroup.valid) {
          this.changeBackgroundColor(this.btn.nativeElement, '#82C3C5');
        }
        else{
          this.changeBackgroundColor(this.btn.nativeElement, "rgb(209,213,219)" )
        }
      });
    }

  changeBackgroundColor(element: HTMLButtonElement, color: string): void {
    element.style.backgroundColor = color;

  }
}
