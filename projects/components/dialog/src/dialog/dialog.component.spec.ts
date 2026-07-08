import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let fixture: ComponentFixture<DialogComponent>;
  let component: DialogComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DialogComponent] }).compileComponents();
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit closeRequest when the backdrop itself is clicked', () => {
    const emitted: void[] = [];
    component.closeRequest.subscribe(() => emitted.push(undefined));
    const host = fixture.nativeElement as HTMLElement;
    (component as any)._onBackdropClick({ target: host, currentTarget: host } as unknown as MouseEvent);
    expect(emitted.length).toBe(1);
  });

  it('should not emit closeRequest when a descendant (not the backdrop) is clicked', () => {
    const emitted: void[] = [];
    component.closeRequest.subscribe(() => emitted.push(undefined));
    const host = fixture.nativeElement as HTMLElement;
    const child = document.createElement('div');
    (component as any)._onBackdropClick({ target: child, currentTarget: host } as unknown as MouseEvent);
    expect(emitted.length).toBe(0);
  });

  it('should not emit closeRequest on backdrop click when disableClose is set', () => {
    fixture.componentRef.setInput('disableClose', true);
    fixture.detectChanges();
    const emitted: void[] = [];
    component.closeRequest.subscribe(() => emitted.push(undefined));
    const host = fixture.nativeElement as HTMLElement;
    (component as any)._onBackdropClick({ target: host, currentTarget: host } as unknown as MouseEvent);
    expect(emitted.length).toBe(0);
  });

  it('should emit closeRequest on Escape unless disableClose is set', () => {
    const emitted: void[] = [];
    component.closeRequest.subscribe(() => emitted.push(undefined));
    (component as any)._onKeydown({ key: 'Escape' } as KeyboardEvent);
    expect(emitted.length).toBe(1);

    fixture.componentRef.setInput('disableClose', true);
    fixture.detectChanges();
    (component as any)._onKeydown({ key: 'Escape' } as KeyboardEvent);
    expect(emitted.length).toBe(1);
  });
});
