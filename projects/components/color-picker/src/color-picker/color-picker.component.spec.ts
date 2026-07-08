import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TinyColor } from '@ctrl/tinycolor';

import { ColorPickerComponent } from './color-picker.component';

describe('ColorPickerComponent', () => {
  let fixture: ComponentFixture<ColorPickerComponent>;
  let component: ColorPickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ColorPickerComponent] }).compileComponents();
    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
  });

  it('should initialize its color from the color input', () => {
    fixture.componentRef.setInput('color', '#00ff00');
    fixture.detectChanges();
    expect((component as any)._color().toHexString()).toBe('#00ff00');
  });

  it('should update the color via writeValue', () => {
    fixture.detectChanges();
    component.writeValue('#0000ff');
    expect((component as any)._color().toHexString()).toBe('#0000ff');
  });

  it('should ignore an invalid color passed to writeValue', () => {
    fixture.detectChanges();
    const before = (component as any)._color();
    component.writeValue('not-a-color');
    expect((component as any)._color()).toBe(before);
  });

  it('should emit colorChange in rgb format by default when the saturation changes', () => {
    fixture.detectChanges();
    const emitted: string[] = [];
    component.colorChange.subscribe((c) => emitted.push(c));
    (component as any).onSaturationColorChange(new TinyColor('#ff0000'));
    expect(emitted[0]).toContain('rgb');
  });

  it('should emit colorChange in hex format when resultFormat is "hex"', () => {
    fixture.componentRef.setInput('resultFormat', 'hex');
    fixture.detectChanges();
    const emitted: string[] = [];
    component.colorChange.subscribe((c) => emitted.push(c));
    (component as any).onSaturationColorChange(new TinyColor('#ff0000'));
    expect(emitted[0]).toBe('#ff0000');
  });

  it('should propagate color changes through the registered CVA onChange callback', () => {
    fixture.detectChanges();
    const onChange = jasmine.createSpy('onChange');
    component.registerOnChange(onChange);
    (component as any).onSaturationColorChange(new TinyColor('#123456'));
    expect(onChange).toHaveBeenCalled();
  });

  it('should reflect disabled state set via the CVA', () => {
    fixture.detectChanges();
    component.setDisabledState(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('is-disabled')).toBe(true);
  });

  it('should prevent the native context menu', () => {
    fixture.detectChanges();
    const event = new Event('contextmenu', { cancelable: true });
    (component as any)._handleContextMenu(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it('should update alpha and emit an updated color', () => {
    fixture.detectChanges();
    (component as any).onSaturationColorChange(new TinyColor('#ff0000'));
    const emitted: string[] = [];
    component.colorChange.subscribe((c) => emitted.push(c));
    (component as any).onAlphaChange(0.5);
    expect((component as any).alpha()).toBe(0.5);
    expect(emitted.length).toBe(1);
  });

  it('should ignore an incomplete hex string typed into the hex input', () => {
    fixture.detectChanges();
    const before = (component as any)._color();
    (component as any).onHexColorChange('#ff');
    expect((component as any)._color()).toBe(before);
  });

  it('should accept a valid 6-digit hex string typed into the hex input', () => {
    fixture.detectChanges();
    const emitted: string[] = [];
    component.colorChange.subscribe((c) => emitted.push(c));
    (component as any).onHexColorChange('#00ff00');
    expect((component as any)._color().toHexString()).toBe('#00ff00');
    expect(emitted.length).toBe(1);
  });
});
