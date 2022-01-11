import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  IconButton,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

//Icons
import AddIcon from "@mui/icons-material/Add";
//cytoscape and extensions
import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";

//import style from "./style";
import "./styles.css";

//inspiration to what to do
//https://codesandbox.io/s/nostalgic-cdn-sni1y?file=/src/index.js:5896-6056

const Graph = () => {
  var nodeHtmlLabel = require("cytoscape-node-html-label");

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
        spacingFactor: 1,
        //nodeDimensionsIncludeLabels: false,
        //spacingFactor: "spacing",
        //styleEnabled: true,
      });

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
        if (typeof cytoscape("core", "nodeHtmlLabel") === "undefined") {
          nodeHtmlLabel(cytoscape);
        }
        graph.current = cytoscape({
          ...diagramDisplay[currentLayout].elements,
          style: [
            //CORE
            {
              selector: "core",
              css: {
                "active-bg-size": 0, //The size of the active background indicator.
              },
            },

            //NODE
            {
              selector: "node",
              css: {
                width: "100px",
                height: "100px",
                shape: "roundrectangle",
                "font-family": "Nokia Pure Regular",
                "background-opacity": "0",
                "border-width": 1,
                "border-color": "#f5f5f5",
              },
            },
            //GROUP
            {
              selector: "node.cy-expand-collapse-collapsed-node",
              css: {
                width: "56px",
                height: "56px",
                "background-opacity": "0",
                "font-family": "Nokia Pure Regular",
              },
            },
            {
              selector: "$node > node",
              css: {
                "background-color": "#fff",
                "background-opacity": "1",
                "border-width": "1px",
                "border-color": "#dcdcdc",

                //LABEL
                //label: "data(name)",
                color: "#000",
                shape: "rectangle",
                "text-opacity": "0.56",
                "font-size": "10px",
                "text-transform": "uppercase",
                "text-wrap": "none",
                "text-max-width": "75px",
                "padding-top": "16px",
                "padding-left": "16px",
                "padding-bottom": "16px",
                "padding-right": "16px",
              },
            },
            {
              selector: ":parent",
              css: {
                "text-valign": "top",
                "text-halign": "center",
              },
            },
            //EDGE
            {
              selector: "edge",
              style: {
                width: 1,
                "line-color": "#b8b8b8",
                "curve-style": "bezier",

                //LABEL
                label: "",
              },
            },
            {
              selector: "edge.hover",
              style: {
                width: 2,
                "line-color": "#239df9",
              },
            },
            {
              selector: "edge:selected",
              style: {
                width: 1,
                "line-color": "#239df9",
              },
            },
          ],
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
        graph.current.nodeHtmlLabel([
          {
            query: ".nodeIcon",
            halign: "center",
            valign: "center",
            halignBox: "center",
            valignBox: "center",
            tpl: function (data) {
              return `<div class="element">                    
                <span class="element-severity_badge">
                  <span>3</span>
                </span>
                <span class="element-graphic">
                  <div class="icon" style='background-image: url(${data.img})' ></div>
                  <span class="overlay"></span>
                </span>
                <span title="${data.label}" class="element-label">${data.label}</span>
              </div>`;
            },
          },
        ]);
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
        style={{
          width: "100%",
          height: "100%",
          background: "#fafafa",
          backgroundImage: `radial-gradient(#bebebe 1px, transparent 0)`,
          backgroundSize: `18px 18px`,
        }}
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
