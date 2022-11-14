import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMultipleComponent } from './upload-multiple.component';

describe('UploadMultipleComponent', () => {
  let component: UploadMultipleComponent;
  let fixture: ComponentFixture<UploadMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
