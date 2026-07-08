import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipComponent } from './chip.component';

describe('ChipComponent', () => {
  let fixture: ComponentFixture<ChipComponent>;
  let component: ChipComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ChipComponent] }).compileComponents();
    fixture = TestBed.createComponent(ChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should toggle selectedChange only for the filter variant', () => {
    fixture.componentRef.setInput('variant', 'filter');
    fixture.componentRef.setInput('selected', false);
    fixture.detectChanges();

    const emitted: boolean[] = [];
    component.selectedChange.subscribe(v => emitted.push(v));

    (component as any)._onClick();

    expect(emitted).toEqual([true]);
  });

  it('should not emit selectedChange for the input variant', () => {
    fixture.componentRef.setInput('variant', 'input');
    fixture.detectChanges();

    const emitted: boolean[] = [];
    component.selectedChange.subscribe(v => emitted.push(v));

    (component as any)._onClick();

    expect(emitted).toEqual([]);
  });

  it('should not emit when disabled', () => {
    fixture.componentRef.setInput('variant', 'filter');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const emitted: boolean[] = [];
    component.selectedChange.subscribe(v => emitted.push(v));

    (component as any)._onClick();

    expect(emitted).toEqual([]);
  });

  it('should emit removed and stop propagation on remove, unless disabled', () => {
    const emitted: void[] = [];
    component.removed.subscribe(() => emitted.push(undefined));
    const event = new MouseEvent('click');
    spyOn(event, 'stopPropagation');

    (component as any)._onRemove(event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(emitted.length).toBe(1);
  });

  it('should not emit removed when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const emitted: void[] = [];
    component.removed.subscribe(() => emitted.push(undefined));

    (component as any)._onRemove(new MouseEvent('click'));

    expect(emitted.length).toBe(0);
  });

  it('should reflect selected/disabled state and variant as host bindings', () => {
    fixture.componentRef.setInput('selected', true);
    fixture.componentRef.setInput('disabled', true);
    fixture.componentRef.setInput('variant', 'suggestion');
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('is-selected')).toBe(true);
    expect(fixture.nativeElement.classList.contains('is-disabled')).toBe(true);
    expect(fixture.nativeElement.getAttribute('data-variant')).toBe('suggestion');
  });

  it('should only render the remove button for the input variant when removable', () => {
    expect(fixture.nativeElement.querySelector('.chip-remove')).not.toBeNull();

    fixture.componentRef.setInput('variant', 'filter');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.chip-remove')).toBeNull();

    fixture.componentRef.setInput('variant', 'input');
    fixture.componentRef.setInput('removable', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.chip-remove')).toBeNull();
  });
});
