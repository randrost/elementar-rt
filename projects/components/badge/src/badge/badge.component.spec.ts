import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  let fixture: ComponentFixture<BadgeComponent>;
  let component: BadgeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [BadgeComponent] }).compileComponents();
    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render nothing when value is null', () => {
    expect(fixture.nativeElement.querySelector('.badge-indicator').textContent.trim()).toBe('');
  });

  it('should render the numeric value as-is when under the max', () => {
    fixture.componentRef.setInput('value', 5);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.badge-indicator').textContent.trim()).toBe('5');
  });

  it('should cap the displayed value at max with a plus suffix', () => {
    fixture.componentRef.setInput('value', 150);
    fixture.componentRef.setInput('max', 99);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.badge-indicator').textContent.trim()).toBe('99+');
  });

  it('should render string values without applying the max cap', () => {
    fixture.componentRef.setInput('value', 'NEW');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.badge-indicator').textContent.trim()).toBe('NEW');
  });

  it('should hide the value entirely when dot mode is enabled', () => {
    fixture.componentRef.setInput('value', 5);
    fixture.componentRef.setInput('dot', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.badge-indicator').textContent.trim()).toBe('');
    expect(fixture.nativeElement.classList.contains('is-dot')).toBe(true);
  });

  it('should reflect variant and position as host attributes', () => {
    fixture.componentRef.setInput('variant', 'danger');
    fixture.componentRef.setInput('position', 'bottom-left');
    fixture.detectChanges();

    expect(fixture.nativeElement.getAttribute('data-variant')).toBe('danger');
    expect(fixture.nativeElement.getAttribute('data-position')).toBe('bottom-left');
  });
});
