import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TinyColor } from '@ctrl/tinycolor';

import { SaturationComponent } from './saturation.component';

describe('SaturationComponent', () => {
  let fixture: ComponentFixture<SaturationComponent>;
  let component: SaturationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SaturationComponent] }).compileComponents();
    fixture = TestBed.createComponent(SaturationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tinyColor', new TinyColor('#ff0000'));
    fixture.detectChanges();
  });

  it('should set the panel background to a pure-hue color on init', () => {
    expect((fixture.nativeElement as HTMLElement).style.backgroundColor).not.toBe('');
  });

  it('should compute saturation/value from the pointer position and emit the new color', () => {
    const emitted: TinyColor[] = [];
    component.colorChange.subscribe(c => emitted.push(c));

    // Top-left corner: saturation 0, value 1 (max brightness, no saturation -> white-ish)
    (component as any).movePointer({ x: 0, y: 0, width: 200, height: 200 });

    const hsv = emitted[0].toHsv();
    expect(hsv.s).toBeCloseTo(0, 5);
    expect(hsv.v).toBeCloseTo(1, 5);
  });

  it('should compute full saturation at the top-right corner (max brightness)', () => {
    const emitted: TinyColor[] = [];
    component.colorChange.subscribe(c => emitted.push(c));

    (component as any).movePointer({ x: 200, y: 0, width: 200, height: 200 });

    const hsv = emitted[0].toHsv();
    expect(hsv.s).toBeCloseTo(1, 5);
    expect(hsv.v).toBeCloseTo(1, 5);
  });

  it('should reduce brightness towards the bottom of the panel', () => {
    const emitted: TinyColor[] = [];
    component.colorChange.subscribe(c => emitted.push(c));

    (component as any).movePointer({ x: 100, y: 200, width: 200, height: 200 });

    const hsv = emitted[0].toHsv();
    expect(hsv.v).toBeCloseTo(0, 5);
  });

  it('should reposition the pointer when tinyColor input changes', () => {
    fixture.componentRef.setInput('tinyColor', new TinyColor('#000000'));
    fixture.detectChanges();

    const pointer = (component as any).pointer().nativeElement as HTMLElement;
    // black -> value 0 -> top 100%, saturation 0 -> left 0%
    expect(pointer.style.top).toBe('100%');
    expect(pointer.style.left).toBe('0%');
  });
});
