import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent, PageEvent } from './paginator.component';

describe('PaginatorComponent', () => {
  let fixture: ComponentFixture<PaginatorComponent>;
  let component: PaginatorComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PaginatorComponent] }).compileComponents();
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('length', 95);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.detectChanges();
  });

  it('should compute the total number of pages', () => {
    expect((component as any)._totalPages()).toBe(10);
  });

  it('should compute the start and end item numbers for the current page', () => {
    expect((component as any)._startItem()).toBe(1);
    expect((component as any)._endItem()).toBe(10);
  });

  it('should navigate to a valid page and emit pageChange', () => {
    const emitted: PageEvent[] = [];
    component.pageChange.subscribe((e) => emitted.push(e));
    (component as any)._go(3);
    expect(component.pageIndex()).toBe(3);
    expect(emitted).toEqual([{ pageIndex: 3, pageSize: 10, length: 95 }]);
  });

  it('should ignore navigation to an out-of-range page', () => {
    (component as any)._go(-1);
    expect(component.pageIndex()).toBe(0);
    (component as any)._go(999);
    expect(component.pageIndex()).toBe(0);
  });

  it('should reset to the first page and emit when the page size changes', () => {
    (component as any)._go(2);
    const emitted: PageEvent[] = [];
    component.pageChange.subscribe((e) => emitted.push(e));
    (component as any)._onPageSizeChange({ target: { value: '25' } } as unknown as Event);
    expect(component.pageSize()).toBe(25);
    expect(component.pageIndex()).toBe(0);
    expect(emitted).toEqual([{ pageIndex: 0, pageSize: 25, length: 95 }]);
  });

  it('should compute a page range window around the current page', () => {
    (component as any)._go(5);
    expect((component as any)._pages).toEqual([3, 4, 5, 6, 7]);
  });

  it('should treat zero length as a single page', () => {
    fixture.componentRef.setInput('length', 0);
    fixture.detectChanges();
    expect((component as any)._totalPages()).toBe(1);
  });
});
