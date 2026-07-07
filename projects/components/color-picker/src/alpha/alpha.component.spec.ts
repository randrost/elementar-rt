import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TinyColor } from '@ctrl/tinycolor';

import { AlphaComponent } from './alpha.component';

describe('AlphaComponent', () => {
  let fixture: ComponentFixture<AlphaComponent>;
  let component: AlphaComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AlphaComponent] }).compileComponents();
    fixture = TestBed.createComponent(AlphaComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tinyColor', new TinyColor('#ff0000'));
    fixture.detectChanges();
  });

  it('should build a left-to-right transparent-to-opaque gradient for the current color', () => {
    expect((component as any).gradient).toBe('linear-gradient(to right, rgba(255, 0, 0, 0) 0%, rgb(255, 0, 0) 100%)');
  });

  it('should compute alpha from the pointer x position and emit it', () => {
    const emitted: number[] = [];
    component.alphaChange.subscribe(a => emitted.push(a));

    (component as any).movePointer({ x: 50, y: 0, width: 100, height: 20 });

    expect(emitted).toEqual([0.5]);
  });

  it('should update the gradient to reflect a hue change via colorFromHue', () => {
    fixture.componentRef.setInput('colorFromHue', new TinyColor('#00ff00'));
    fixture.detectChanges();

    expect((component as any).gradient).toContain('rgb(0, 255, 0)');
  });
});
