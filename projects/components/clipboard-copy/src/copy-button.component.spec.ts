import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CopyButtonComponent } from './copy-button.component';

describe('CopyButtonComponent', () => {
  let fixture: ComponentFixture<CopyButtonComponent>;
  let component: CopyButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CopyButtonComponent] }).compileComponents();
    fixture = TestBed.createComponent(CopyButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('text', 'hello world');
    fixture.componentRef.setInput('resetDelay', 1000);
    fixture.detectChanges();
    spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
  });

  it('should copy the configured text to the clipboard and show copied state', fakeAsync(() => {
    (component as any)._copy();
    tick();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello world');
    expect((component as any)._copied()).toBe(true);
  }));

  it('should revert to the uncopied state after resetDelay', fakeAsync(() => {
    (component as any)._copy();
    tick();
    tick(1000);
    expect((component as any)._copied()).toBe(false);
  }));

  it('should silently ignore clipboard failures', fakeAsync(() => {
    (navigator.clipboard.writeText as jasmine.Spy).and.returnValue(Promise.reject(new Error('denied')));
    (component as any)._copy();
    tick();
    expect((component as any)._copied()).toBe(false);
  }));
});
