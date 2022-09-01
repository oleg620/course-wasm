import { generate } from "./generate.js";
import * as Visualize from "./visualize/visualize.js";
import * as Solver from "./solver/solver.js";

const site = generate();

Visualize.init(site);
Solver.init(site).then(solverInstance => 
    {
        setInterval(solverInstance.iterate, 1000);
    });

