import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockLoaderComponent } from './block-loader.component';

describe('BlockLoaderComponent', () => {
  let fixture: ComponentFixture<BlockLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [BlockLoaderComponent] }).compileComponents();
    fixture = TestBed.createComponent(BlockLoaderComponent);
    fixture.detectChanges();
  });

  it('should reflect the loading input as a host class', () => {
    expect(fixture.nativeElement.classList.contains('is-loading')).toBe(false);

    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('is-loading')).toBe(true);
  });
});
