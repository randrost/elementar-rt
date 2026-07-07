import { TestBed } from '@angular/core/testing';

import { FormGeneratorService } from './form-generator.service';
import { FormConfig } from '../models/form-config.model';

describe('FormGeneratorService', () => {
  let service: FormGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormGeneratorService);
  });

  it('should create one control per field element, skipping content elements', () => {
    const config: FormConfig = {
      layout: { columns: 1, children: [] },
      elements: [
        { name: 'title', type: 'input', kind: 'field' },
        { name: 'banner', type: 'image', kind: 'content' },
      ],
    } as any;

    const group = service.createFormGroup(config);
    expect(group.contains('title')).toBe(true);
    expect(group.contains('banner')).toBe(false);
  });

  it('should prefer an explicit initial value over the config value', () => {
    const config: FormConfig = {
      layout: { columns: 1, children: [] },
      elements: [{ name: 'email', type: 'input', kind: 'field', value: 'default@x.com' }],
    } as any;

    const group = service.createFormGroup(config, { email: 'override@x.com' });
    expect(group.get('email')?.value).toBe('override@x.com');
  });

  it('should fall back to the config value when no initial value is given', () => {
    const config: FormConfig = {
      layout: { columns: 1, children: [] },
      elements: [{ name: 'email', type: 'input', kind: 'field', value: 'default@x.com' }],
    } as any;

    const group = service.createFormGroup(config);
    expect(group.get('email')?.value).toBe('default@x.com');
  });

  it('should apply validators declared on the field config', () => {
    const config: FormConfig = {
      layout: { columns: 1, children: [] },
      elements: [{
        name: 'email', type: 'input', kind: 'field',
        validators: [{ type: 'required', message: 'Required' }],
      }],
    } as any;

    const group = service.createFormGroup(config);
    expect(group.get('email')?.valid).toBe(false);
    group.get('email')?.setValue('anything');
    expect(group.get('email')?.valid).toBe(true);
  });

  it('should create a disabled control when the field config marks it disabled', () => {
    const config: FormConfig = {
      layout: { columns: 1, children: [] },
      elements: [{ name: 'email', type: 'input', kind: 'field', disabled: true }],
    } as any;

    const group = service.createFormGroup(config);
    expect(group.get('email')?.disabled).toBe(true);
  });

  it('should apply cross-field validators from the form config', () => {
    const config: FormConfig = {
      layout: { columns: 1, children: [] },
      elements: [{ name: 'a', type: 'input', kind: 'field' }],
      crossValidators: [() => ({ crossFieldError: true })],
    } as any;

    const group = service.createFormGroup(config);
    expect(group.errors).toEqual({ crossFieldError: true });
  });
});
