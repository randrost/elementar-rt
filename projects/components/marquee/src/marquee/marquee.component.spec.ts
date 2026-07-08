import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueeComponent } from './marquee.component';

describe('MarqueeComponent', () => {
  let fixture: ComponentFixture<MarqueeComponent>;
  let component: MarqueeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [MarqueeComponent] }).compileComponents();
    fixture = TestBed.createComponent(MarqueeComponent);
    component = fixture.componentInstance;
  });

  it('should set the reverse CSS custom property when reverse changes', () => {
    fixture.componentRef.setInput('reverse', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.style.getPropertyValue('--emr-marquee-reverse')).toBe('reverse');
  });

  it('should clear the reverse custom property when reverse is false', () => {
    fixture.componentRef.setInput('reverse', true);
    fixture.detectChanges();
    fixture.componentRef.setInput('reverse', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.style.getPropertyValue('--emr-marquee-reverse')).toBe('');
  });

  it('should set the pause custom property to "paused" when pauseOnHover is enabled', () => {
    fixture.componentRef.setInput('pauseOnHover', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.style.getPropertyValue('--emr-marquee-pause')).toBe('paused');
  });

  it('should set the pause custom property to "running" when pauseOnHover is disabled', () => {
    fixture.componentRef.setInput('pauseOnHover', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.style.getPropertyValue('--emr-marquee-pause')).toBe('running');
  });
});
