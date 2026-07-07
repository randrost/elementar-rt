import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenLoaderComponent } from './screen-loader.component';

describe('ScreenLoaderComponent', () => {
  let fixture: ComponentFixture<ScreenLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ScreenLoaderComponent] }).compileComponents();
    fixture = TestBed.createComponent(ScreenLoaderComponent);
    fixture.detectChanges();
  });

  it('should reflect the opened input as a host class', () => {
    expect(fixture.nativeElement.classList.contains('is-opened')).toBe(false);

    fixture.componentRef.setInput('opened', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('is-opened')).toBe(true);
  });
});
