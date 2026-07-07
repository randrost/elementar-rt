import { TestBed } from '@angular/core/testing';

import { ComponentRegistryService } from './component-registry.service';
import { FORM_RENDERER_FIELD_REGISTRY } from '../models/form-config.model';
import { InputFieldComponent } from '../fields/input-field/input-field.component';

describe('ComponentRegistryService', () => {
  it('should resolve the built-in "input" importer to InputFieldComponent', async () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(ComponentRegistryService);
    const importer = service.getImporter('input');
    expect(importer).toBeDefined();
    const component = await importer!();
    expect(component).toBe(InputFieldComponent);
  });

  it('should return undefined for an unregistered type', () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(ComponentRegistryService);
    expect(service.getImporter('does-not-exist')).toBeUndefined();
  });

  it('should merge in importers supplied via the FORM_RENDERER_FIELD_REGISTRY token', async () => {
    const customImporter = () => Promise.resolve(InputFieldComponent);
    TestBed.configureTestingModule({
      providers: [{ provide: FORM_RENDERER_FIELD_REGISTRY, useValue: { custom: customImporter } }],
    });
    const service = TestBed.inject(ComponentRegistryService);
    const importer = service.getImporter('custom');
    expect(importer).toBe(customImporter);
  });
});
