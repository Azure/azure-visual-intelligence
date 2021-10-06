import * as React from "react";
import Graph from "./Graph";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";

const GraphContainer = () => {
  const dispatch = useDispatch();

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

  return (
    <div
      ref={dnddrop}
      style={{ width: "100%", height: "100%", background: "#ffffff" }}
    >
      <Graph elements={elements} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default GraphContainer;
