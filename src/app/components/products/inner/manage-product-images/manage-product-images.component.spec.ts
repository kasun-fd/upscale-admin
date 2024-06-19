import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductImagesComponent } from './manage-product-images.component';

describe('ManageProductImagesComponent', () => {
  let component: ManageProductImagesComponent;
  let fixture: ComponentFixture<ManageProductImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageProductImagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageProductImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
