import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDetectionAI } from './image-detection-ai';

describe('ImageDetectionAI', () => {
  let component: ImageDetectionAI;
  let fixture: ComponentFixture<ImageDetectionAI>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageDetectionAI]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageDetectionAI);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
