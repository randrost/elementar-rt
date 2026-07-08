import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetComponent } from './bottom-sheet.component';

describe('BottomSheetComponent', () => {
  let fixture: ComponentFixture<BottomSheetComponent>;
  let component: BottomSheetComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [BottomSheetComponent] }).compileComponents();
    fixture = TestBed.createComponent(BottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit closeRequest when the backdrop is clicked', () => {
    const emitted: void[] = [];
    component.closeRequest.subscribe(() => emitted.push(undefined));
    const host = fixture.nativeElement as HTMLElement;
    (component as any)._onBackdropClick({ target: host, currentTarget: host } as unknown as MouseEvent);
    expect(emitted.length).toBe(1);
  });

  it('should not emit closeRequest when disableClose is set', () => {
    fixture.componentRef.setInput('disableClose', true);
    fixture.detectChanges();
    const emitted: void[] = [];
    component.closeRequest.subscribe(() => emitted.push(undefined));
    const host = fixture.nativeElement as HTMLElement;
    (component as any)._onBackdropClick({ target: host, currentTarget: host } as unknown as MouseEvent);
    expect(emitted.length).toBe(0);
  });

  it('should reflect the open input via the is-open host class', () => {
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('is-open')).toBe(true);
  });
});
