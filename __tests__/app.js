'use strict';
const path = require('path'),
  assert = require('yeoman-assert'),
  helpers = require('yeoman-test');

describe('generator-dcrtit:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({someAnswer: true});
  });

  it('creates files', () => {
    assert.file([
      'dummyfile.txt'
    ]);
  });
});
