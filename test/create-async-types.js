import test from 'ava';

import { config, createAsyncTypes } from '../src';

const defaultConfig = Object.assign({}, config);
test.beforeEach(() => {
  Object.assign(config, defaultConfig);
});

test('should throw if no type found', t => {
  t.throws(createAsyncTypes, /expected a string for type/);
});

test('should throw delimiter is not a string', t => {
  t.throws(
    () => createAsyncTypes('foo', null),
    /expected a string for delimiter/
  );
});

test('should return default object with type', t => {
  const type = 'foo';
  const expected = {
    start: 'foo.start',
    next: 'foo.next',
    error: 'foo.error',
    complete: 'foo.complete'
  };
  const actual = createAsyncTypes('foo');
  t.is(expected.start, actual.start);
  t.is(expected.next, actual.next);
  t.is(expected.error, actual.error);
  t.is(expected.complete, actual.complete);
  t.is(type, '' + actual);
});

test('should respect delimiter arg', t => {
  const type = 'foo';
  const expected = {
    start: 'foo_start',
    next: 'foo_next',
    error: 'foo_error',
    complete: 'foo_complete'
  };
  const actual = createAsyncTypes('foo', '_');
  t.is(expected.start, actual.start);
  t.is(expected.next, actual.next);
  t.is(expected.error, actual.error);
  t.is(expected.complete, actual.complete);
  t.is(type, '' + actual);
});

test('should use config delimiter', t => {
  config.delimiter = '_';
  const type = 'foo';
  const expected = {
    start: 'foo_start',
    next: 'foo_next',
    error: 'foo_error',
    complete: 'foo_complete'
  };
  const actual = createAsyncTypes('foo');
  t.is(expected.start, actual.start);
  t.is(expected.next, actual.next);
  t.is(expected.error, actual.error);
  t.is(expected.complete, actual.complete);
  t.is(type, '' + actual);
});

test('should use config start', t => {
  config.start = 'START';
  const type = 'foo';
  const expected = {
    start: 'foo.START',
    next: 'foo.next',
    error: 'foo.error',
    complete: 'foo.complete'
  };
  const actual = createAsyncTypes('foo');
  t.is(expected.start, actual.start);
  t.is(expected.next, actual.next);
  t.is(expected.error, actual.error);
  t.is(expected.complete, actual.complete);
  t.is(type, '' + actual);
});

test('should use config next', t => {
  config.next = 'NEXT';
  const type = 'foo';
  const expected = {
    start: 'foo.start',
    next: 'foo.NEXT',
    error: 'foo.error',
    complete: 'foo.complete'
  };
  const actual = createAsyncTypes('foo');
  t.is(expected.start, actual.start);
  t.is(expected.next, actual.next);
  t.is(expected.error, actual.error);
  t.is(expected.complete, actual.complete);
  t.is(type, '' + actual);
});

test('should use config error', t => {
  config.error = 'ERROR';
  const type = 'foo';
  const expected = {
    start: 'foo.start',
    next: 'foo.next',
    error: 'foo.ERROR',
    complete: 'foo.complete'
  };
  const actual = createAsyncTypes('foo');
  t.is(expected.start, actual.start);
  t.is(expected.next, actual.next);
  t.is(expected.error, actual.error);
  t.is(expected.complete, actual.complete);
  t.is(type, '' + actual);
});

test('should use config complete', t => {
  config.complete = 'complete';
  const type = 'foo';
  const expected = {
    start: 'foo.start',
    next: 'foo.next',
    error: 'foo.error',
    complete: 'foo.complete'
  };
  const actual = createAsyncTypes(type);
  t.is(expected.start, actual.start);
  t.is(expected.next, actual.next);
  t.is(expected.error, actual.error);
  t.is(expected.complete, actual.complete);
  t.is(type, '' + actual);
});

test('should update keys', t => {
  config.shouldChangeAsyncKeys = true;
  config.start = 'START';
  config.next = 'NEXT';
  config.complete = 'COMPLETE';
  config.error = 'ERROR';
  const expected = {
    START: 'foo.START',
    NEXT: 'foo.NEXT',
    ERROR: 'foo.ERROR',
    COMPLETE: 'foo.COMPLETE'
  };
  const actual = createAsyncTypes('foo');
  t.is(expected.START, actual.START);
  t.is(expected.NEXT, actual.NEXT);
  t.is(expected.ERROR, actual.ERROR);
  t.is(expected.COMPLETE, actual.COMPLETE);
  t.is('foo', '' + actual);
});
