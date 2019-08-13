# WebAssembly course

In this course you will get an introduction to WebAssembly and 3D visualization using Three.js.

WebAssembly is a binary compilation format which lets you run languages like C, C++ and Rust in the browser.
This means exising code can be used in web application and possibilies for increased performance by using lower-level languages than JavaScript.
Three.js is a highly successful library which is used to create 3D applications which run in the browser.

At Spacemaker we use Three.js in large parts of our applications to let our users interact buildings on
building sites, and to visualize analysis of the buildings. WebAssembly is an emerging technology
which we have done some experiments with and are considering to include in our product.

In the first part of the course we will give you an introduction to WebAssembly and Three.js, and in the
the second part you will finish a project which combines both these technologies to find an optimal
utilization of a building site. (no prior knowledge about WebAssembly, Three.js or optimization is required.)

## Usage

Install dependencies with `npm install` and [`emcc`](https://emscripten.org/docs/getting_started/downloads.html)

Build the code with `./build.sh`

Start a web server `npm run start`

Open your browser on `http://localhost:3000`

## Assignment

The assignments in this workshop have 2 parts. First you will finish the
missing parts of code. You can find these by searching through the code by
number, e.g. "1." for the first task. When you finish one task you should be
able to refresh your browser and see a visual change. When you have completed
all 9 task you should have a complete program which searches and visualizes
the intermediate steps until an optimal solution is found.

The second part builds on the foundation in part 1 with more advanced task.
Here we have put together independent task so that you can choose the task
you would like to try based on what interests you.

### 1. Rendering the scene

At the center of all 3D application is the `render` call. It tells your CPU
to update the scene and geometry on the GPU and schedule a rendering pass.
This will result in a 3D image being written to the framebuffer of the GPU.
This framebuffer will be mapped to the screen.

### 2. Implementing the render loop

The render method must be called each time we want to update the image on
the screen. This is usually done in a render loop running at 60 frame per
seconds. This means that the render function will be called each ~16 ms
and must not take more time to finish. If it takes more time we will get
less that 60 fps which might result in noticable lagg.

The browser has a function called `requestAnimationFrame`. This function
is intended to be used for animations and using it will ensure that our
render loop runs at the same frequency as our monitor, which is usually
60 fps.

### 3. Building the scene

A `Three.js` object consists of two main properties. The `geometry`
describes the location and shape of the object while the `material`
describes how it looks. There more than one way of building these
objects. In this task we will use a `THREE.Shape` which defines
a 2d shape on a plane. And a `THREE.ExtrudeGeometry` to extend the shape
with a height. This cooresponds to a building with an uniform height (flat roof) and vertical
walls.

The data model for our houses is a 2d ground polygon plus the height
of the building. These are flattened into a list of numbers
(`[x0, y0, x1, y1, x2, y2, x3, y3, height, ... ]`). The first building
is at indexes 0-8 in the array, the second at 9-16 and so on.

### 4. Adding a directional light

The light source in the scene is an Ambient light. This will uniformally
light every object in the scene. It is an convenient light to add to emulate
real light conditions to brighten up shadows. However real lighting situations
have a source of the light. We will add a Directional Light source to emulate
sun light, which is a source far away from our scene.

We want our Directional Light to cast shadows. This takes a bit of code to
set up for nice results. The gist is that the GPU create the light source
by placing an Orthograpic Camera at the position of the light source and takes
a picture of the scene. Every thing that it sees is deemed to receive light
and the rest is shadow. This technique is called shadow mapping.
The parameters we set on `light.shadow.camera` is the size of this camera.

In addition to configuring the light source we need to set `receiveShadow`
and `castShadow` to `true` on each object which should receive and cast
shadows respectively.

### 5. Loading a WebAssembly module

To compile C++ to WebAssembly and to load it into the browser we will use
the `emscripten` toolchain. This does a lot of the heavy lifting on our behalf
by both loading and wrapping the wasm module with a JavaScript wrapper.

Lets first look at a much simpler example so that we can load and wrap the wasm
module our selves. The module is already compiled to [`.wasm`](src/simple/simple.wasm).

The [`simple.wat`](src/simple/simple.wat) file is the text representation of the `.wasm` module.

### 6. Compiling the wasm module

This assumes that you have install `emcc` on your system.

To compile our C++ code into WebAssembly files we will use the `emscripten`
toolchain. This is a C/C++ compiler which will create `.wasm`
(the WebAssembly binary), `.wast`

### 7. Load the `emcc` wasm module

### 8. Debugging the module in

Hack need to run `ln -s ../src src` from the [`out`](out) directory.

The [`Firefox Developer Edition`](https://www.mozilla.org/nb-NO/firefox/developer/)
lets us debug the WebAssembly with source maps directly in our browser.

Open your application in `Firefox` and open the [`Developer Console`](https://developer.mozilla.org/en-US/docs/Tools/Web_Console/Opening_the_Web_Console).

You should now be able to open your `.cpp` files using the file tree or ctrl-P or cmd-P.
