import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyStateComponent } from './empty-state.component';

describe('EmptyStateComponent', () => {
  let fixture: ComponentFixture<EmptyStateComponent>;
  let component: EmptyStateComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EmptyStateComponent] }).compileComponents();
    fixture = TestBed.createComponent(EmptyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should fall back to the no-data preset copy by default', () => {
    expect((component as any)._title).toBe('Nothing here yet');
    expect((component as any)._description).toBe('Data will appear here once it is available.');
    expect((component as any)._icon).toBe('📭');
  });

  it('should switch preset copy based on the preset input', () => {
    fixture.componentRef.setInput('preset', 'no-results');
    fixture.detectChanges();

    expect((component as any)._title).toBe('No results found');
    expect(fixture.nativeElement.getAttribute('data-preset')).toBe('no-results');
  });

  it('should let explicit title/description/icon inputs override the preset', () => {
    fixture.componentRef.setInput('preset', 'error');
    fixture.componentRef.setInput('title', 'Custom title');
    fixture.componentRef.setInput('description', 'Custom description');
    fixture.componentRef.setInput('icon', '💥');
    fixture.detectChanges();

    expect((component as any)._title).toBe('Custom title');
    expect((component as any)._description).toBe('Custom description');
    expect((component as any)._icon).toBe('💥');
  });

  it('should render empty copy for the custom preset with no overrides', () => {
    fixture.componentRef.setInput('preset', 'custom');
    fixture.detectChanges();

    expect((component as any)._title).toBe('');
    expect((component as any)._description).toBe('');
    expect((component as any)._icon).toBe('');
  });
});
