async function init(site) {
  const simple = await require('./simple.js');
//   const memory = new WebAssembly.Memory({ initial: 256, maximum: 256 });
//   const importObjects = { env: { memory } };
  
//   const binary = await fetch('src/simple/simple.wasm');
//   const instance = (await WebAssembly.instantiateStreaming(binary, importObjects)).instance;

//   const heap = new Float32Array(memory.buffer);

//   const buildings = site.getBuildings();
//   for (let i = 0; i < buildings.length; i++) {
//     heap[i] = buildings[i];
//   }

//   function iterate() {
//     instance.exports.move(0, buildings.length);
    
//     const result = [];
//     for (let i = 0; i < buildings.length; i++) {
//       result.push(heap[i]);
//     }

//     site.setBuildings(new Float32Array(heap.buffer, 0, buildings.length));
//   }

//   return { iterate };
}
