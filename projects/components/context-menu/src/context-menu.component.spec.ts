import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextMenuTriggerDirective } from './context-menu-trigger.directive';
import { ContextMenuComponent } from './context-menu.component';
import { ContextMenuItemComponent } from './context-menu-item.component';
import { ContextMenuCheckboxItemComponent } from './context-menu-checkbox-item.component';
import { ContextMenuRadioItemComponent } from './context-menu-radio-item.component';
import { ContextMenuGroupComponent } from './context-menu-group.component';
import { ContextMenuLabelComponent } from './context-menu-label.component';
import { ContextMenuSeparatorComponent } from './context-menu-separator.component';
import { ContextMenuSubTriggerComponent } from './context-menu-sub-trigger.component';
import { ContextMenuItemIconDirective } from './context-menu-item-icon.directive';
import { ContextMenuShortcutDirective } from './context-menu-shortcut.directive';

@Component({
  imports: [
    ContextMenuTriggerDirective,
    ContextMenuComponent,
    ContextMenuItemComponent,
    ContextMenuCheckboxItemComponent,
    ContextMenuRadioItemComponent,
    ContextMenuGroupComponent,
    ContextMenuLabelComponent,
    ContextMenuSeparatorComponent,
    ContextMenuSubTriggerComponent,
    ContextMenuItemIconDirective,
    ContextMenuShortcutDirective
  ],
  template: `
    <div class="area" [emrContextMenuTriggerFor]="menu" [emrContextMenuDisabled]="disabled()">Right click</div>
    <ng-template #menu>
      <emr-context-menu>
        <emr-context-menu-group>
          <button emr-context-menu-item (triggered)="reloaded = true">
            <i emrContextMenuItemIcon>refresh</i>
            Reload
            <span emrContextMenuShortcut>⌘R</span>
          </button>
          <button emr-context-menu-item disabled>Forward</button>
          <button [emrContextMenuSubTriggerFor]="sub">More tools</button>
        </emr-context-menu-group>
        <emr-context-menu-group>
          <button emr-context-menu-checkbox-item [(checked)]="bookmarks">Show bookmarks</button>
        </emr-context-menu-group>
        <emr-context-menu-group [(value)]="person">
          <emr-context-menu-label inset>People</emr-context-menu-label>
          <emr-context-menu-separator/>
          <button emr-context-menu-radio-item value="pedro">Pedro</button>
          <button emr-context-menu-radio-item value="colm">Colm</button>
        </emr-context-menu-group>
      </emr-context-menu>
    </ng-template>
    <ng-template #sub>
      <emr-context-menu compact>
        <button emr-context-menu-item>Save page</button>
      </emr-context-menu>
    </ng-template>
  `
})
class TestHostComponent {
  disabled = signal(false);
  bookmarks = signal(true);
  person = signal<unknown>('pedro');
  reloaded = false;
}

describe('ContextMenuComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  const overlay = (): HTMLElement => document.querySelector('.cdk-overlay-container') as HTMLElement;
  const menu = (): HTMLElement | null => overlay()?.querySelector('emr-context-menu') ?? null;
  const items = (selector: string): HTMLElement[] => Array.from(menu()?.querySelectorAll(selector) ?? []);

  const open = () => {
    const area: HTMLElement = fixture.nativeElement.querySelector('.area');
    area.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: 20, clientY: 20 }));
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.destroy();
  });

  it('should open the menu on contextmenu', () => {
    expect(menu()).toBeNull();
    open();
    expect(menu()).not.toBeNull();
    expect(menu()!.getAttribute('role')).toBe('menu');
    expect(items('.emr-context-menu-group').length).toBe(3);
  });

  it('should not open when disabled', () => {
    host.disabled.set(true);
    fixture.detectChanges();
    open();
    expect(menu()).toBeNull();
  });

  it('should emit triggered and close when an item is clicked', () => {
    open();
    items('.emr-context-menu-item')[0].click();
    fixture.detectChanges();
    expect(host.reloaded).toBeTrue();
    expect(menu()).toBeNull();
  });

  it('should mark disabled items', () => {
    open();
    expect(items('.emr-context-menu-item')[1].getAttribute('aria-disabled')).toBe('true');
  });

  it('should reflect and toggle checkbox items', () => {
    open();
    const checkbox = items('.emr-context-menu-checkbox-item')[0];
    expect(checkbox.getAttribute('role')).toBe('menuitemcheckbox');
    expect(checkbox.classList).toContain('is-checked');
    checkbox.click();
    fixture.detectChanges();
    expect(host.bookmarks()).toBeFalse();
  });

  it('should select radio items through the group value', () => {
    open();
    const radios = items('.emr-context-menu-radio-item');
    expect(radios[0].classList).toContain('is-checked');
    expect(radios[1].classList).not.toContain('is-checked');
    radios[1].click();
    fixture.detectChanges();
    expect(host.person()).toBe('colm');
  });

  it('should open a submenu from a sub trigger', () => {
    open();
    const subTrigger = items('.emr-context-menu-sub-trigger')[0];
    expect(subTrigger.getAttribute('aria-haspopup')).toBe('menu');
    subTrigger.click();
    fixture.detectChanges();
    const menus = overlay().querySelectorAll('emr-context-menu');
    expect(menus.length).toBe(2);
    expect(menus[1].classList).toContain('is-compact');
  });
});
