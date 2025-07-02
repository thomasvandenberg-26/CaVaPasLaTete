import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCreationProfilComponent } from './page-creation-profil.component';

describe('PageCreationProfilComponent', () => {
  let component: PageCreationProfilComponent;
  let fixture: ComponentFixture<PageCreationProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageCreationProfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCreationProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
