emcc -s EXPORTED_FUNCTIONS=_move -s EXPORTED_RUNTIME_METHODS=ccall,cwrap --no-entry simple.c -o simple.js