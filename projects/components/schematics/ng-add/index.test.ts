import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { Tree } from '@angular-devkit/schematics';
import * as path from 'path';
import { highestMajor, parseMajor } from '../utils/package-config';

const collection = path.join(__dirname, '../collection.json');

async function run(pkg: Record<string, unknown>): Promise<Record<string, any>> {
  const runner = new SchematicTestRunner('elementar-rt', collection);
  const tree = Tree.empty();
  tree.create('/package.json', JSON.stringify(pkg));
  const result = await runner.runSchematic('ng-add', {}, tree as any) as any;
  return JSON.parse(result.readContent('/package.json'));
}

describe('ng-add versions', () => {
  [20, 21, 22].forEach((major) => {
    it(`derives Angular/ngrx versions for an Angular ${major} project`, async () => {
      const json = await run({ dependencies: { '@angular/core': `~${major}.1.3` } });
      const range = `^${major}.0.0`;
      expect(json.devDependencies['@angular/localize']).toBe(range);
      expect(json.dependencies['@angular/cdk']).toBe(range);
      expect(json.dependencies['@angular/material']).toBe(range);
      expect(json.dependencies['@ngrx/signals']).toBe(range);
      expect(json.dependencies['@ngrx/store']).toBe(range);
    });
  });

  it('reads @angular/core from devDependencies too', async () => {
    const json = await run({ devDependencies: { '@angular/core': '^21.0.0' } });
    expect(json.dependencies['@angular/cdk']).toBe('^21.0.0');
  });

  it('falls back to the highest major of the library peer range', async () => {
    const json = await run({ dependencies: {} });
    expect(json.dependencies['@angular/cdk']).toMatch(/^\^\d+\.0\.0$/);
    expect(json.dependencies['@ngrx/store']).toBe(json.dependencies['@angular/cdk']);
  });

  it('parses majors', () => {
    expect(parseMajor('^21.2.0')).toBe(21);
    expect(parseMajor('latest')).toBeNull();
    expect(highestMajor('^20.0.0 || ^21.0.0')).toBe(21);
    expect(highestMajor('^22.0.0 || ^21.0.0')).toBe(22);
  });
});
