// Runs the compiled schematic specs (out-tsc/schematics-spec) with jasmine-core in plain node.
const fs = require('fs');
const path = require('path');
const out = path.join(__dirname, '../../out-tsc/schematics-spec');
// the compiled schematics resolve collection.json, schema.json and ../../package.json relative to themselves
fs.copyFileSync(path.join(__dirname, 'schematics/collection.json'), path.join(out, 'collection.json'));
fs.copyFileSync(path.join(__dirname, 'schematics/ng-add/schema.json'), path.join(out, 'ng-add/schema.json'));
fs.copyFileSync(path.join(__dirname, 'schematics/package.json'), path.join(out, 'package.json'));
const pkg = require('./package.json');
fs.mkdirSync(path.join(out, '../'), { recursive: true });
fs.writeFileSync(path.join(out, '../package.json'), JSON.stringify({ peerDependencies: pkg.peerDependencies, type: 'commonjs' }));

const jasmineRequire = require('jasmine-core');
const jasmine = jasmineRequire.core(jasmineRequire);
const env = jasmine.getEnv();
Object.assign(global, jasmineRequire.interface(jasmine, env));
let failed = 0;
env.addReporter({
  specDone: (r) => { console.log(`${r.status === 'passed' ? 'ok  ' : 'FAIL'} ${r.fullName}`); if (r.status === 'failed') { failed++; r.failedExpectations.forEach((e) => console.log('   ' + e.message)); } },
  jasmineDone: () => { process.exitCode = failed ? 1 : 0; },
});
require(path.join(out, 'ng-add/index.spec.js'));
env.execute();
