module.exports = wallaby => {
  const compilerOptions = Object.assign(
    require('./tsconfig.json').compilerOptions,
    require('./lib/src/tsconfig.spec.json').compilerOptions
  );

  return {
    files: [
      'lib/src/tsconfig.spec.json',
      'lib/src/tsconfig.es5.json',
      'lib/src/jest.ts',
      'lib/src/**/*.ts',
      '!lib/src/**/*.spec.ts'
    ],

    tests: ['lib/src/**/*.spec.ts'],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      'lib/src/**/*.ts': wallaby.compilers.typeScript(compilerOptions)
    },

    testFramework: 'jest',
    setup: function() {
      const jestConfig = require('./package.json').jest;
      wallaby.testFramework.configure(jestConfig);
    },
    debug: true
  };
};
