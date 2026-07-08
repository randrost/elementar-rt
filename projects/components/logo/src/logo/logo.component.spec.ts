import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [LogoComponent] }).compileComponents();
    fixture = TestBed.createComponent(LogoComponent);
    fixture.detectChanges();
  });

  it('should default to the text appearance class', () => {
    expect(fixture.nativeElement.classList.contains('is-text')).toBe(true);
    expect(fixture.nativeElement.classList.contains('is-image')).toBe(false);
  });

  it('should switch to the image appearance class', () => {
    fixture.componentRef.setInput('appearance', 'image');
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('is-image')).toBe(true);
    expect(fixture.nativeElement.classList.contains('is-text')).toBe(false);
  });
});
