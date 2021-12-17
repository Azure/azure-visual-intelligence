import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { Button } from "@mui/material";
//cytoscape and extensions
import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
import popper from "cytoscape-popper";

import style from "./style";

const Graph = () => {
  const dispatch = useDispatch();
  const container = React.useRef(null);
  const graph = React.useRef();
  const layout = React.useRef();

  const [, dnddrop] = useDrop(() => ({
    accept: "TREEVIEW",
    canDrop: () => true,
    drop: (item) =>
      dispatch({
        type: "DRAGnDROP",
        payload: item,
      }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const currentLayout = useSelector(
    (state) => state.settings.diagram.CurrentLayout
  );
  const diagramDisplay = useSelector((state) => state.diagram.display);
  //const diagramDisplay = useSelector((state) => state.diagram.display);

  const DeployPortalLink =
    "https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2FAzureStack-QuickStart-Templates%2Fmaster%2F101-vm-windows-create%2Fazuredeploy.json";

  const DeployThroughPortal = (event) => {
    window.open(DeployPortalLink, "_blank").focus();
  };

  React.useEffect(() => {
    if (graph.current) {
      if (layout.current) {
        layout.current.stop();
      }
      graph.current.elements().remove();

      graph.current.add(diagramDisplay[currentLayout].elements);

      layout.current = graph.current.makeLayout({
        //avoidOverlap: true,
        // 'draft', 'default' or 'proof'
        // - "draft" only applies spectral layout
        // - "default" improves the quality with incremental layout (fast cooling rate)
        // - "proof" improves the quality with incremental layout (slow cooling rate)
        quality: "default",
        // Use random node positions at beginning of layout
        // if this is set to false, then quality option must be "proof"
        randomize: true,
        // Whether or not to animate the layout
        animate: true,
        // Duration of animation in ms, if enabled
        animationDuration: 1000,
        // Easing of animation, if enabled
        animationEasing: undefined,
        // Fit the viewport to the repositioned nodes
        fit: true,
        // Padding around layout
        padding: 30,
        // Whether to include labels in node dimensions. Valid in "proof" quality
        nodeDimensionsIncludeLabels: false,
        // Whether or not simple nodes (non-compound nodes) are of uniform dimensions
        uniformNodeDimensions: false,
        // Whether to pack disconnected components - cytoscape-layout-utilities extension should be registered and initialized
        packComponents: true,
        // Layout step - all, transformed, enforced, cose - for debug purpose only
        step: "all",

        /* spectral layout options */

        // False for random, true for greedy sampling
        samplingType: true,
        // Sample size to construct distance matrix
        sampleSize: 25,
        // Separation amount between nodes
        nodeSeparation: 200,
        // Power iteration tolerance
        piTol: 0.0000001,

        /* incremental layout options */

        // Node repulsion (non overlapping) multiplier
        nodeRepulsion: (node) => 6000,
        // Ideal edge (non nested) length
        idealEdgeLength: (edge) => 50,
        // Divisor to compute edge forces
        edgeElasticity: (edge) => 0.45,
        // Nesting factor (multiplier) to compute ideal edge length for nested edges
        nestingFactor: 0.1,
        // Maximum number of iterations to perform - this is a suggested value and might be adjusted by the algorithm as required
        numIter: 2500,
        // For enabling tiling
        tile: true,
        // Represents the amount of the vertical space to put between the zero degree members during the tiling operation(can also be a function)
        tilingPaddingVertical: 10,
        // Represents the amount of the horizontal space to put between the zero degree members during the tiling operation(can also be a function)
        tilingPaddingHorizontal: 10,
        // Gravity force (constant)
        gravity: 0.25,
        // Gravity range (constant) for compounds
        gravityRangeCompound: 1.5,
        // Gravity force (constant) for compounds
        gravityCompound: 1.0,
        // Gravity range (constant)
        gravityRange: 3.8,
        // Initial cooling factor for incremental layout
        initialEnergyOnIncremental: 0.3,
        name: "fcose",
        //nodeDimensionsIncludeLabels: false,
        //spacingFactor: "spacing",
        //styleEnabled: true,
      });

      //Popper example
      //Updates to do :
      // need to handle empty graph
      // does not do destroy properly when a new resource is added to the Graph
      //get the data from redux for each node

      /*let node = graph.current.nodes().first();
      let popper1 = node.popper({
        content: () => {
          let div = document.createElement("div");
          div.innerHTML = "Overlay content";
          document.body.appendChild(div);
          return div;
        },
        popper: {}, // my popper options here
      });
      const update = () => {
        popper1.update();
      };
      graph.current.elements().on("position", update);
      graph.current.on("pan zoom resize", update);*/
      layout.current.run();
    }
  }, [diagramDisplay, currentLayout]);

  React.useEffect(() => {
    if (!container.current) {
      return;
    }
    try {
      if (!graph.current) {
        cytoscape.use(fcose);
        cytoscape.use(popper);
        graph.current = cytoscape({
          ...diagramDisplay[currentLayout].elements,
          style,
          minZoom: 0.2,
          maxZoom: 4,
          container: container.current,
        });
        graph.current.on("click", "node", function (evt) {
          dispatch({
            type: "SELECT_NODE",
            payload: this.data(),
          });
          console.log("clicked " + this.data());
        });
      }
    } catch (error) {
      console.log("error");
      console.error(error);
    }
    return () => {
      graph.current && graph.current.destroy();
    };
  }, []);

  return (
    <div
      ref={dnddrop}
      style={{ width: "100%", height: "100%", background: "#ffffff" }}
    >
      <div
        style={{ width: "100%", height: "100%" }}
        className="graph"
        ref={container}
      />
    </div>
  );
};

export default Graph;
/*      <div style={{ position: "absolute", top: "1200px", left: "2000px" }}>
        <Button variant="contained" onClick={DeployThroughPortal}>Deploy</Button>
      </div>*/
