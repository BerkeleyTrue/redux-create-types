import invariant from 'invariant';

export const config = {
  delimiter: '.',
  next: 'next',
  start: 'start',
  error: 'error',
  complete: 'complete',
  shouldChangeAsyncKeys: false
};

export function createTypes(types, ns, delimiter = config.delimiter) {
  invariant(
    Array.isArray(types),
    'createTypes expected a Array of strings for types, but got %s',
    types
  );
  invariant(
    ns && typeof ns === 'string',
    'createTypes expected a string for ns, but got %s',
    delimiter
  );
  invariant(
    delimiter && typeof delimiter === 'string',
    'createAsyncTypes expected a string for delimiter, but got %s',
    delimiter
  );
  return types.reduce((types, type) => {
    if (typeof type === 'string') {
      types[type] = ns + delimiter + type;
    } else if (
      type &&
      typeof type === 'object' &&
      typeof type.toString === 'function'
    ) {
      types[type.toString()] = Object.keys(type).reduce((typeObj, key) => {
        const value = type[key];
        if (key === 'toString') {
          typeObj.toString = () => ns + delimiter + value();
        } else if (value && typeof value === 'string') {
          typeObj[key] = ns + delimiter + value;
        }
        return typeObj;
      }, {});
    }
    return types;
  }, {});
}

export function createAsyncTypes(type, delimiter = config.delimiter) {
  invariant(
    type && typeof type === 'string',
    'createAsyncTypes expected a string for type, but got %s',
    type
  );
  invariant(
    delimiter && typeof delimiter === 'string',
    'createAsyncTypes expected a string for delimiter, but got %s',
    delimiter
  );
  let start = 'start';
  let next = 'next';
  let error = 'error';
  let complete = 'complete';
  const updateKeys = config.shouldChangeAsyncKeys;
  if (updateKeys) {
    start = config.start;
    next = config.next;
    complete = config.complete;
    error = config.error;
  }
  return {
    [ start ]: type + delimiter + config.start,
    [ next ]: type + delimiter + config.next,
    [ error ]: type + delimiter + config.error,
    [ complete ]: type + delimiter + config.complete,
    toString: () => type
  };
}
