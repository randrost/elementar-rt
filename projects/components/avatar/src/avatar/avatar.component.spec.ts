import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  let fixture: ComponentFixture<AvatarComponent>;
  let component: AvatarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AvatarComponent] }).compileComponents();
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
  });

  it('should reveal the text label only after the view has rendered', fakeAsync(() => {
    fixture.componentRef.setInput('label', 'JD');
    fixture.detectChanges();
    expect((component as any).showLabel).toBe(false);

    tick();

    expect((component as any).showLabel).toBe(true);
  }));

  it('should mark the image as loaded once onImageLoaded fires', () => {
    fixture.componentRef.setInput('image', 'https://example.test/avatar-unique-1.png');
    fixture.detectChanges();
    expect((component as any).imageLoaded).toBe(false);

    component.onImageLoaded();

    expect((component as any).imageLoaded).toBe(true);
  });

  it('should validate hex colors of length 3, 6 and 8, rejecting anything else', () => {
    expect(component.isValidHex('#abc')).toBe(true);
    expect(component.isValidHex('#aabbcc')).toBe(true);
    expect(component.isValidHex('#aabbccdd')).toBe(true);
    expect(component.isValidHex('abc')).toBe(true);
    expect(component.isValidHex('not-a-color')).toBe(false);
    expect(component.isValidHex('')).toBe(false);
    expect(component.isValidHex(null)).toBe(false);
  });

  it('should apply automatic color CSS custom properties for a valid hex', () => {
    fixture.detectChanges();
    fixture.componentRef.setInput('automaticColor', '#336699');
    fixture.detectChanges();

    const style = (fixture.nativeElement as HTMLElement).style;
    expect(style.getPropertyValue('--emr-avatar-bg')).toBe('#336699');
    expect(style.getPropertyValue('--emr-avatar-border-color')).not.toBe('');
    expect(style.getPropertyValue('--emr-avatar-color')).not.toBe('');
  });

  it('should throw when given an invalid automatic color', () => {
    fixture.detectChanges();
    fixture.componentRef.setInput('automaticColor', 'not-a-color');
    expect(() => fixture.detectChanges()).toThrowError(
      /Invalid not-a-color color/
    );
  });

  it('should reflect the presence indicator state classes', () => {
    fixture.componentRef.setInput('presenceIndicator', 'online');
    fixture.detectChanges();

    const indicator = fixture.nativeElement.querySelector('.presence-indicator');
    expect(indicator.classList.contains('is-online')).toBe(true);
  });
});
