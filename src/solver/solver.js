import Module from "../../solver.js";


export async function init(site) {
  const instance = await Module();
  // extern "C" void move(float *positions, int n)
  const wrappedMove = instance.cwrap("move", /*returnType*/ null, /*arg types*/ ["number", "number"]);
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  const buildings = site.getBuildings();
  var nDataBytes = buildings.length * buildings.BYTES_PER_ELEMENT;

  // Allocate memory inside the wasm module
  var dataPtr = instance._malloc(nDataBytes);
  // Create a view to the buffer on the Javascript side
  const data = new Float32Array(
    instance.HEAPF32.buffer,
    dataPtr,
    buildings.length
  );

  // Write the initial buildings into the module through the view
  data.set(buildings);

  // Javascript wrapper to run an iteration
  function iterate() {

    wrappedMove(data, buildings.length);

    const hasConverged = isEqual(buildings, data);

    site.setBuildings(data);

    return hasConverged;
  }

  function cleanUp() {
    instance._free(dataPtr);
  }

  return { iterate };
}

function isEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}
