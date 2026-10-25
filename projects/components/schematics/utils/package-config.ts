import { Tree } from '@angular-devkit/schematics';

function sortObjectByKeys(obj: Record<string, string>) {
  return Object.keys(obj)
    .sort()
    // @ts-ignore
    .reduce((result, key) => (result[key] = obj[key]) && result, {});
}

export function addPackageToPackageJson(tree: Tree, pkg: string, version: string, devDependency = false): Tree {
  if (tree.exists('package.json')) {
    const sourceText = tree.read('package.json')!.toString('utf-8');
    const json = JSON.parse(sourceText);

    const dependenciesType = devDependency ? 'devDependencies' : 'dependencies';
    const dependencies = json[dependenciesType] || {};

    dependencies[pkg] = version;
    json[dependenciesType] = sortObjectByKeys(dependencies);

    tree.overwrite('package.json', JSON.stringify(json, null, 2));
  }

  return tree;
}

export function getPackageVersionFromPackageJson(
  tree: Tree,
  name: string,
  includeDevDependencies = false,
): string | null {
  if (!tree.exists('package.json')) {
    return null;
  }

  const packageJson = JSON.parse(tree.read('package.json')!.toString('utf8'));

  if (packageJson.dependencies && packageJson.dependencies[name]) {
    return packageJson.dependencies[name];
  }

  if (includeDevDependencies && packageJson.devDependencies && packageJson.devDependencies[name]) {
    return packageJson.devDependencies[name];
  }

  return null;
}

/** Extracts the first major number from a semver range ("^21.2.0", "~20.3.1", ">=20 <23", "21.x"). */
export function parseMajor(range: string | null | undefined): number | null {
  const match = /(\d+)/.exec(range ?? '');
  return match ? parseInt(match[1], 10) : null;
}

/** Highest major mentioned in a peer range such as "^20.0.0 || ^21.0.0". */
export function highestMajor(range: string | null | undefined): number | null {
  const majors = (range ?? '').match(/\d+(?=[.\sx*|]|$)/g)?.map(Number) ?? [];
  return majors.length ? Math.max(...majors) : null;
}

/**
 * Angular major of the target project (from @angular/core), falling back to the highest
 * major of the library's own @angular/core peer range.
 */
export function resolveAngularMajor(tree: Tree, libraryPeerRange?: string | null): number {
  const fromProject = parseMajor(getPackageVersionFromPackageJson(tree, '@angular/core', true));
  if (fromProject) {
    return fromProject;
  }
  return highestMajor(libraryPeerRange) ?? 20;
}
