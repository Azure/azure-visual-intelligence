import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
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

  const elements = useSelector((state) => state.diagram.elements);

  React.useEffect(() => {
    if (graph.current) {
      if (layout.current) {
        layout.current.stop();
      }
      graph.current.elements().remove();
      graph.current.add(elements);

      layout.current = graph.current.makeLayout({
        avoidOverlap: true,
        name: "cose",
        nodeDimensionsIncludeLabels: false,
        spacingFactor: "spacing",
        styleEnabled: false,
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
  }, [elements]);

  React.useEffect(() => {
    if (!container.current) {
      return;
    }
    try {
      if (!graph.current) {
        cytoscape.use(fcose);
        cytoscape.use(popper);
        graph.current = cytoscape({
          elements,
          style,
          minZoom: 1,
          maxZoom: 4,
          container: container.current,
        });
        graph.current.on("click", "node", function (evt) {
          dispatch({
            type: "SELECT_NODE",
            payload: this.id(),
          });
          console.log("clicked " + this.id());
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
