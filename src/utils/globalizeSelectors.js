/**
 * globalized selector. Globalized means it get a whole
 * state of the app as an input, and get the result by applying local state transform to state
 * Usually localStateTransform is just a local slice of the app state.
 *
 * @example
 * result of state.get('fleet');
 *
 * using ajust allows us pass multiple arguments to the selector
 *
 * read next articles to wrap around:
 * http://randycoulman.com/blog/2016/09/27/modular-reducers-and-selectors/
 * http://randycoulman.com/blog/2016/11/29/globalizing-redux-selectors/
 *
 */

import { adjust, map } from 'ramda';

const globalize = localTransform => selector => (...args) =>
  selector(...adjust(localTransform, -1, args));

export default (localStateTransform, selectors) =>
  map(globalize(localStateTransform), selectors);
