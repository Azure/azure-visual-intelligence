import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
//UI
import CytoscapeComponent from "react-cytoscapejs";
import popper from "cytoscape-popper";

const CytoScape = () => {
  const dispatch = useDispatch();

  const layout = {
    avoidOverlap: true,
    name: "cose",
    nodeDimensionsIncludeLabels: false,
    spacingFactor: "spacing",
  };

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
      <CytoscapeComponent
        minZoom={0.2}
        maxZoom={4}
        elements={CytoscapeComponent.normalizeElements(elements)}
        style={{ width: "100%", height: "100%" }}
        stylesheet={[
          {
            selector: "node",
            style: {
              "background-width": "90%",
              "background-height": "90%",
              //if label is empty we display ID, ID can't be empty
              label: (node) => {
                return node.data("label")
                  ? node.data("label")
                  : node.data("id");
              },
              shape: "roundrectangle",
              width: "128",
              height: "128",
              "border-width": "0",
              "font-family": '"Segoe UI", Arial, Helvetica, sans-serif',
              "font-size": "20",
              "text-valign": "bottom",
              "background-opacity": 0,
              "background-image": (node) => {
                return `url(${process.env.PUBLIC_URL + node.data("img")}')`;
              },
              //'background-fit': 'contain',
              //'background-color' : 'transparent'
            },
          },
          {
            selector: "node:selected",
            style: {
              "border-width": "4",
              //"border-color": "borderColor", // invalid
            },
          },
          {
            selector: "edge",
            style: {
              "target-arrow-shape": "triangle",
              "curve-style": "bezier",
              width: 6,
              //"line-color": "lineColor", //invalid
              "arrow-scale": "1.5",
              // "target-arrow-color": "lineColor", // invalid
              opacity: 0.3,
            },
          },
          {
            selector: ":parent",
            style: {
              "background-image": "none",
              //   'label': node => { return getLabel(node) },
              "border-width": "4",
              // 'border-color': borderColor,
              "border-opacity": 0.3,
              //  'background-color': borderColor,
              "background-opacity": 0.1,
              shape: "roundrectangle",
              "font-family": '"Segoe UI", Arial, Helvetica, sans-serif',
              "font-size": "15vh",
              // 'color': textColor,
              "text-valign": "bottom",
              "text-margin-y": "10vh",
              "font-size": "20",
              // 'text-outline-color': textColorOutline,
              //"text-outline-width": "4",
            },
          },
        ]}
        layout={layout}
        cy={(cy) => {
          cy.on("click", "node", function (evt) {
            dispatch({
              type: "SELECT_NODE",
              payload: this.id(),
            });
            console.log("clicked " + this.id());
          });
        }}
      />
    </div>
  );
};

export default CytoScape;
