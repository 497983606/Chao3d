Error.stackTraceLimit = Infinity;

var testContext = require.context('./../../src/__test__', true, /\.test\.ts/);

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

var modules = requireAll(testContext);
