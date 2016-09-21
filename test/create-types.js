import test from 'ava';

import { config, createTypes, createAsyncTypes } from '../src';

const defaultConfig = Object.assign({}, config);
test.beforeEach(() => {
  Object.assign(config, defaultConfig);
});

test('should throw if no types is not an array', t => {
  t.throws(createTypes, /expected a Array of strings for types/);
});

test('should throw if ns is not a string', t => {
  t.throws(() => createTypes(['foo'], {}), /expected a string for ns/);
});

test('should throw if ns is not a string', t => {
  t.throws(
    () => createTypes(['foo'], 'app', {}),
    /expected a string for delimiter/
  );
});

test('should return an object', t => {
  const expected = {};
  const actual = createTypes([], 'app');
  t.deepEqual(expected, actual);
});

test('should add type keys to object', t => {
  const expected = { foo: 'app.foo' };
  const actual = createTypes(['foo'], 'app');
  t.deepEqual(expected, actual);
});

test('should respect delimiter', t => {
  const expected = { foo: 'app_foo' };
  const actual = createTypes(['foo'], 'app', '_');
  t.deepEqual(expected, actual);
});

test('should respect config delimiter', t => {
  config.delimiter = '_';
  const expected = { foo: 'app_foo' };
  const actual = createTypes(['foo'], 'app');
  t.deepEqual(expected, actual);
});

test('should ignore non-strings', t => {
  const expected = { foo: 'app.foo' };
  const actual = createTypes(['foo', () => {}], 'app');
  t.deepEqual(expected, actual);
});

test('should add async type keys to object', t => {
  const expected = {
    foo: 'app.foo',
    bar: {
      start: 'app.bar.start',
      next: 'app.bar.next',
      error: 'app.bar.error',
      completed: 'app.bar.completed'
    }
  };
  const actual = createTypes(
    [
      'foo',
      createAsyncTypes('bar')
    ],
    'app'
  );
  t.is(expected.foo, actual.foo);
  t.is(expected.bar.start, actual.bar.start);
  t.is(expected.bar.next, actual.bar.next);
  t.is(expected.bar.error, actual.bar.error);
  t.is(expected.bar.completed, actual.bar.completed);
  t.is('app.bar', '' + actual.bar);
});

test('should ignore non-strings in async types objects', t => {
  const expected = {
    foo: 'app.foo',
    bar: { toString() { return 'bar'; } }
  };
  const actual = createTypes(
    [
      'foo',
      {
        start: {},
        toString() { return 'bar'; }
      }
    ],
    'app'
  );
  t.is(expected.foo, actual.foo);
  t.is('app.bar', '' + actual.bar);
  t.not(!!actual.bar.start);
});
