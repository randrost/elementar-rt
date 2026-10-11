import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { SearchItemComponent } from '../search-item/search-item.component';
import {
  SearchItemLeadingDirective,
  SearchItemSupportingDirective,
  SearchLeadingDirective,
  SearchTrailingDirective
} from '../search-slots.directive';
import { SearchVariant } from '../types';

@Component({
  imports: [
    SearchComponent,
    SearchItemComponent,
    SearchLeadingDirective,
    SearchTrailingDirective,
    SearchItemLeadingDirective,
    SearchItemSupportingDirective
  ],
  template: `
    <button class="outside">Outside</button>
    <emr-search [variant]="variant()" [(open)]="open" [(query)]="query"
                (search)="submitted = $event" (selected)="selected = $event">
      <button emrSearchLeading class="menu" (click)="menuClicks = menuClicks + 1">menu</button>
      <span emrSearchTrailing>avatar</span>
      @for (item of results(); track item) {
        <emr-search-item [value]="item" [disabled]="item === 'disabled'">
          <i emrSearchItemLeading>history</i>
          {{ item }}
          <span emrSearchItemSupporting>Supporting text</span>
        </emr-search-item>
      }
    </emr-search>
  `
})
class TestHostComponent {
  variant = signal<SearchVariant>('docked');
  open = signal(false);
  query = signal('');
  results = signal(['alpha', 'disabled', 'beta']);
  submitted: string | null = null;
  selected: unknown = null;
  menuClicks = 0;
}

describe('SearchComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let element: HTMLElement;

  const search = (): HTMLElement => element.querySelector('emr-search') as HTMLElement;
  const input = (): HTMLInputElement => element.querySelector('input') as HTMLInputElement;
  const view = (): HTMLElement => element.querySelector('.view') as HTMLElement;
  const items = (): HTMLElement[] => Array.from(element.querySelectorAll('emr-search-item'));
  const keydown = (key: string) => {
    input().dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    element = fixture.nativeElement;
    document.body.appendChild(element);
    fixture.detectChanges();
  });

  afterEach(() => element.remove());

  it('should render a closed search bar with combobox semantics', () => {
    expect(input().getAttribute('role')).toBe('combobox');
    expect(input().getAttribute('aria-expanded')).toBe('false');
    expect(input().getAttribute('aria-controls')).toBe(view().id);
    expect(view().hidden).toBeTrue();
    expect(search().classList).toContain('is-docked');
  });

  it('should open when the input is focused', () => {
    input().focus();
    input().dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    expect(host.open()).toBeTrue();
    expect(view().hidden).toBeFalse();
    expect(input().getAttribute('aria-expanded')).toBe('true');
    expect(element.querySelector('[aria-label="Close search"]')).not.toBeNull();
  });

  it('should not open when a leading button is clicked', () => {
    (element.querySelector('.menu') as HTMLElement).click();
    fixture.detectChanges();
    expect(host.menuClicks).toBe(1);
    expect(host.open()).toBeFalse();
  });

  it('should open when the bar is clicked', () => {
    (element.querySelector('.bar') as HTMLElement).click();
    fixture.detectChanges();
    expect(host.open()).toBeTrue();
  });

  it('should sync the query while typing', () => {
    input().value = 'hello';
    input().dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(host.query()).toBe('hello');
    expect(host.open()).toBeTrue();
  });

  it('should emit search on Enter when no item is active', () => {
    host.query.set('term');
    fixture.detectChanges();
    keydown('Enter');
    expect(host.submitted).toBe('term');
  });

  it('should navigate items with the arrow keys, skipping disabled items', () => {
    host.open.set(true);
    fixture.detectChanges();
    keydown('ArrowDown');
    expect(input().getAttribute('aria-activedescendant')).toBe(items()[0].id);
    expect(items()[0].classList).toContain('is-active');
    keydown('ArrowDown');
    expect(input().getAttribute('aria-activedescendant')).toBe(items()[2].id);
    keydown('Enter');
    expect(host.selected).toBe('beta');
    expect(host.open()).toBeFalse();
  });

  it('should select an item on click and close', () => {
    host.open.set(true);
    fixture.detectChanges();
    items()[0].click();
    fixture.detectChanges();
    expect(host.selected).toBe('alpha');
    expect(host.open()).toBeFalse();
  });

  it('should ignore clicks on disabled items', () => {
    host.open.set(true);
    fixture.detectChanges();
    items()[1].click();
    expect(host.selected).toBeNull();
  });

  it('should clear the query first and close on a second clear', () => {
    host.open.set(true);
    host.query.set('abc');
    fixture.detectChanges();
    const clear = () => {
      (element.querySelector('[aria-label="Clear search"]') as HTMLElement).click();
      fixture.detectChanges();
    };
    clear();
    expect(host.query()).toBe('');
    expect(host.open()).toBeTrue();
    clear();
    expect(host.open()).toBeFalse();
  });

  it('should close on Escape', () => {
    host.open.set(true);
    fixture.detectChanges();
    keydown('Escape');
    expect(host.open()).toBeFalse();
  });

  it('should close a docked search on pointerdown outside', () => {
    host.open.set(true);
    fixture.detectChanges();
    element.querySelector('.outside')!.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    fixture.detectChanges();
    expect(host.open()).toBeFalse();
  });

  it('should keep a fullscreen search open on pointerdown outside', () => {
    host.variant.set('fullscreen');
    host.open.set(true);
    fixture.detectChanges();
    expect(search().classList).toContain('is-fullscreen');
    element.querySelector('.outside')!.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    fixture.detectChanges();
    expect(host.open()).toBeTrue();
  });
});
