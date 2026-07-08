import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassToggleVisibilityComponent } from './pass-toggle-visibility.component';

describe('PassToggleVisibilityComponent', () => {
  let fixture: ComponentFixture<PassToggleVisibilityComponent>;
  let component: PassToggleVisibilityComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PassToggleVisibilityComponent] }).compileComponents();
    fixture = TestBed.createComponent(PassToggleVisibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should default to password type and reveal text on click, toggling the icon', () => {
    expect(component.type).toBe('password');
    expect(fixture.nativeElement.querySelector('mat-icon').textContent.trim()).toBe('visibility_off');

    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();

    expect(component.type).toBe('text');
    expect(fixture.nativeElement.querySelector('mat-icon').textContent.trim()).toBe('visibility');
  });

  it('should snapshot _visible from the default input value at construction time, before any bound input is applied', () => {
    // `protected _visible = this.visible();` runs as a field initializer,
    // which executes before Angular applies a bound `visible` input value
    // (even one set via componentRef.setInput before the first
    // detectChanges), so it always captures the default (false) here.
    const fixture2 = TestBed.createComponent(PassToggleVisibilityComponent);
    fixture2.componentRef.setInput('visible', true);
    fixture2.detectChanges();

    expect(fixture2.componentInstance.type).toBe('password');
  });
});
