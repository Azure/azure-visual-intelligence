import * as React from "react";
import cytoscape from "cytoscape";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";

import style from "./style";

const Graph = () => {
  const dispatch = useDispatch();
  const container = React.useRef(null);
  const graph = React.useRef();
  const layout = React.useRef();

  const [{ isOver, canDrop }, dnddrop] = useDrop(() => ({
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
        graph.current.on("click", "node", function (evt) {
          dispatch({
            type: "SELECT_NODE",
            payload: this.id(),
          });
          console.log("clicked " + this.id());
        });
      }
    } catch (error) {
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
