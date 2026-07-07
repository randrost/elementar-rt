import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TinyColor } from '@ctrl/tinycolor';

import { HueComponent } from './hue.component';

describe('HueComponent', () => {
  let fixture: ComponentFixture<HueComponent>;
  let component: HueComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HueComponent] }).compileComponents();
    fixture = TestBed.createComponent(HueComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tinyColor', new TinyColor('#ff0000'));
    fixture.detectChanges();
  });

  it('should position the pointer proportionally to the hue on init/change', () => {
    const pointer = (component as any).pointer().nativeElement as HTMLElement;
    // red (#ff0000) has hue 0 -> left 0%
    expect(pointer.style.left).toBe('0%');
  });

  it('should compute a new pure hue color from the pointer x position and emit it', () => {
    const emitted: TinyColor[] = [];
    component.colorChange.subscribe(c => emitted.push(c));

    (component as any).movePointer({ x: 180, y: 0, width: 360, height: 20 });

    expect(emitted.length).toBe(1);
    expect(Math.round(emitted[0].toHsv().h)).toBe(180);
  });

  it('should clamp hue at 359 when the pointer reaches the far right edge', () => {
    const emitted: TinyColor[] = [];
    component.colorChange.subscribe(c => emitted.push(c));

    (component as any).movePointer({ x: 360, y: 0, width: 360, height: 20 });

    expect(Math.round(emitted[0].toHsv().h)).toBe(359);
  });

  it('should reposition the pointer when a new tinyColor input arrives', () => {
    fixture.componentRef.setInput('tinyColor', new TinyColor('#00ff00'));
    fixture.detectChanges();

    const pointer = (component as any).pointer().nativeElement as HTMLElement;
    // green (#00ff00) has hue 120 -> left ~33.33%
    expect(parseFloat(pointer.style.left)).toBeCloseTo(120 / 360 * 100, 2);
  });
});
