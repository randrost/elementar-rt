// Karma configuration shared by both the demo app and the component library.
//
// The Angular `@angular/build:karma` builder supplies the framework, plugins,
// reporters and coverage wiring automatically. This file only customises the
// browser launchers so the suite runs headless in CI (and inside containers
// that execute as root, where Chrome's sandbox is unavailable).
//
// Use the `ChromeHeadlessNoSandbox` launcher via:
//   ng test --browsers=ChromeHeadlessNoSandbox --watch=false
module.exports = function (config) {
  config.set({
    // Supplying a custom karmaConfig means the Jasmine framework is no longer
    // auto-registered, so declare it explicitly. Karma auto-discovers the
    // matching `karma-jasmine` plugin from node_modules; the builder keeps its
    // own internal plugin (which serves the bundled specs) from the base config.
    frameworks: ['jasmine'],
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        // `--no-sandbox` is required when Chrome runs as root (CI containers).
        // `--disable-gpu` / `--disable-dev-shm-usage` avoid flaky crashes on
        // machines with a small `/dev/shm`.
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--headless=new',
        ],
      },
    },
    // Fail fast in CI instead of hanging forever if a browser disconnects.
    browserDisconnectTimeout: 20000,
    browserNoActivityTimeout: 60000,
    restartOnFileChange: false,
  });
};
