import * as React from "react";
import cytoscape from "cytoscape";

import style from "./style";

const Graph = ({ elements }) => {
  const container = React.useRef(null);
  const graph = React.useRef();
  const layout = React.useRef();

  React.useEffect(() => {
    if (graph.current) {
      if (layout.current) {
        layout.current.stop();
      }
      graph.current.elements().remove();
      graph.current.add(elements);
      layout.current = graph.current.elements().makeLayout({
        avoidOverlap: true,
        name: "cose",
        nodeDimensionsIncludeLabels: false,
        spacingFactor: "spacing",
      });
      layout.current.run();
    }
  }, [elements]);

  React.useEffect(() => {
    if (!container.current) {
      return;
    }
    try {
      if (!graph.current) {
        //cytoscape.use(fcose);
        graph.current = cytoscape({
          elements,
          style,
          minZoom: 0.2,
          maxZoom: 4,
          container: container.current,
        });
      }
    } catch (error) {
      console.log("ici");
      console.error(error);
    }
    return () => {
      graph.current && graph.current.destroy();
    };
  }, []);

  return (
    <div
      style={{ width: "100%", height: "100%" }}
      className="graph"
      ref={container}
    />
  );
};

export default Graph;
