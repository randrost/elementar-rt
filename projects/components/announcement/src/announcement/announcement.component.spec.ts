import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementComponent } from './announcement.component';

describe('AnnouncementComponent', () => {
  let fixture: ComponentFixture<AnnouncementComponent>;
  let component: AnnouncementComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AnnouncementComponent] }).compileComponents();
    fixture = TestBed.createComponent(AnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should default the data-variant attribute to neutral', () => {
    expect(fixture.nativeElement.getAttribute('data-variant')).toBe('neutral');
  });

  it('should reflect the variant input as a host attribute', () => {
    fixture.componentRef.setInput('variant', 'warning');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-variant')).toBe('warning');
  });

  it('should emit closed when close is invoked', () => {
    const emitted: void[] = [];
    component.closed.subscribe(() => emitted.push(undefined));

    (component as any).close();

    expect(emitted.length).toBe(1);
  });
});
