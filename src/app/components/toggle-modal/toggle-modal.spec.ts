import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleModal } from './toggle-modal';

describe('ToggleModal', () => {
  let component: ToggleModal;
  let fixture: ComponentFixture<ToggleModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
