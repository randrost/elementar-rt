import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandBarComponent } from './command-bar.component';

describe('CommandBarComponent', () => {
  let fixture: ComponentFixture<CommandBarComponent>;
  let component: CommandBarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CommandBarComponent] }).compileComponents();
    fixture = TestBed.createComponent(CommandBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should toggle the is-open host class based on the open input', () => {
    expect(fixture.nativeElement.classList.contains('is-open')).toBe(false);

    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('is-open')).toBe(true);
  });

  it('should default the position attribute to bottom', () => {
    expect(fixture.nativeElement.getAttribute('emr-command-bar-position')).toBe('bottom');
  });

  it('should reflect the position input as a host attribute', () => {
    fixture.componentRef.setInput('position', 'top');
    fixture.detectChanges();

    expect(fixture.nativeElement.getAttribute('emr-command-bar-position')).toBe('top');
  });
});
