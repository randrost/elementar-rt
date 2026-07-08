import { ComponentFixture, TestBed } from '@angular/core/testing';
import { addIcon } from 'iconify-icon';

import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    // loadIcon() falls back to a network request when the icon isn't already
    // registered, which this sandboxed test run has no access to; register a
    // fake icon locally so the component resolves it without any network call.
    addIcon('emr-test:home', { body: '<path d="M0 0h24v24H0z"/>', width: 24, height: 24 });

    await TestBed.configureTestingModule({ imports: [IconComponent] }).compileComponents();
    fixture = TestBed.createComponent(IconComponent);
  });

  it('should apply its host class', () => {
    fixture.componentRef.setInput('name', 'emr-test:home');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('emr-icon')).toBe(true);
  });

  it('should render an svg once the icon data resolves', async () => {
    fixture.componentRef.setInput('name', 'emr-test:home');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg.getAttribute('viewBox')).toBe('0 0 24 24');
  });

  it('should not attempt to load an icon when name is empty', async () => {
    fixture.componentRef.setInput('name', '');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('svg')).toBeNull();
  });
});
