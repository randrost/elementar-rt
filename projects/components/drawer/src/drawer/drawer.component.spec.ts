import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerComponent } from './drawer.component';

describe('DrawerComponent', () => {
  let fixture: ComponentFixture<DrawerComponent>;
  let component: DrawerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DrawerComponent] }).compileComponents();
    fixture = TestBed.createComponent(DrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.classList.remove('overflow-hidden');
  });

  it('should start closed by default', () => {
    expect(component.isOpened).toBe(false);
  });

  it('should open and emit opened, adding the body overflow-hidden class', () => {
    const emitted: void[] = [];
    component.opened.subscribe(() => emitted.push(undefined));
    component.open();
    fixture.detectChanges();
    expect(component.isOpened).toBe(true);
    expect(emitted.length).toBe(1);
    expect(document.body.classList.contains('overflow-hidden')).toBe(true);
  });

  it('should close and emit closed, removing the body overflow-hidden class', () => {
    component.open();
    fixture.detectChanges();
    const emitted: void[] = [];
    component.closed.subscribe(() => emitted.push(undefined));
    component.close();
    fixture.detectChanges();
    expect(component.isOpened).toBe(false);
    expect(emitted.length).toBe(1);
    expect(document.body.classList.contains('overflow-hidden')).toBe(false);
  });

  it('should reflect the isOpen input when provided', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
    expect(component.isOpened).toBe(true);
  });

  it('should close on Escape while open', () => {
    component.open();
    fixture.detectChanges();
    (component as any).onKeydownHandler({});
    expect(component.isOpened).toBe(false);
  });

  it('should do nothing on Escape while already closed', () => {
    const emitted: void[] = [];
    component.closed.subscribe(() => emitted.push(undefined));
    (component as any).onKeydownHandler({});
    expect(emitted.length).toBe(0);
  });
});
