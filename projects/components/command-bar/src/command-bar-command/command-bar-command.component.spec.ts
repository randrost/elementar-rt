import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandBarCommandComponent } from './command-bar-command.component';

describe('CommandBarCommandComponent', () => {
  let fixture: ComponentFixture<CommandBarCommandComponent>;
  let component: CommandBarCommandComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CommandBarCommandComponent] }).compileComponents();
    fixture = TestBed.createComponent(CommandBarCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not render a shortcut element when no shortcut is provided', () => {
    expect(fixture.nativeElement.querySelector('.shortcut')).toBeNull();
  });

  it('should render the shortcut text when provided', () => {
    fixture.componentRef.setInput('shortcut', '⌘K');
    fixture.detectChanges();

    const shortcutEl = fixture.nativeElement.querySelector('.shortcut');
    expect(shortcutEl).not.toBeNull();
    expect(shortcutEl.textContent.trim()).toBe('⌘K');
  });
});
