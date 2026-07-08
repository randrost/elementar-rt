import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaturePadComponent } from './signature-pad.component';

describe('SignaturePadComponent', () => {
  let fixture: ComponentFixture<SignaturePadComponent>;
  let component: SignaturePadComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SignaturePadComponent] }).compileComponents();
    fixture = TestBed.createComponent(SignaturePadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should not emit signatureSaved when the canvas is blank', () => {
    const emitted: string[] = [];
    component.signatureSaved.subscribe((url) => emitted.push(url));
    spyOn(console, 'warn');
    component.save();
    expect(emitted).toEqual([]);
  });

  it('should emit signatureSaved with a data URL once something is drawn', () => {
    const canvas = component.mainCanvasRef().nativeElement;
    const memCanvas = (component as any).memoryCanvasElement as HTMLCanvasElement;
    const ctx = memCanvas.getContext('2d')!;
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(0, 0, 20, 20);

    const emitted: string[] = [];
    component.signatureSaved.subscribe((url) => emitted.push(url));
    component.save();
    expect(emitted.length).toBe(1);
    expect(emitted[0]).toContain('data:image/png');
  });

  it('should emit signatureCleared when cleared', () => {
    let cleared = false;
    component.signatureCleared.subscribe(() => (cleared = true));
    component.clear();
    expect(cleared).toBe(true);
  });

  it('should update the pen color via onColorChange', () => {
    component.onColorChange('#0059ff');
    expect(component.penColor()).toBe('#0059ff');
  });

  it('should clear the canvas on Escape', () => {
    let cleared = false;
    component.signatureCleared.subscribe(() => (cleared = true));
    component.handleEscapeKey(new Event('keydown'));
    expect(cleared).toBe(true);
  });
});
