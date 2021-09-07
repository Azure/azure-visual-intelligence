import { React } from "react";
import { useSelector } from "react-redux";
//UI
import CytoscapeComponent from "react-cytoscapejs";

const CytoScape = () => {
  const layout = {
    avoidOverlap: true,
    name: "cose",
    nodeDimensionsIncludeLabels: false,
    spacingFactor: "spacing",
  };

  const elements = useSelector((state) => state.diagram.elements);

  return (
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
            //'label':'VM',
            shape: "roundrectangle",
            width: "128",
            height: "128",
            "border-width": "0",
            "font-family": '"Segoe UI", Arial, Helvetica, sans-serif',
            "font-size": "8",
            "text-valign": "bottom",
            //'color': textColor,
            "background-opacity": 0,
            //'background-image': 'https://cdn.onlinewebfonts.com/svg/img_194174.png', working with background opactity 0 and that's all
            //'background-image': node => { return `url(${process.env.PUBLIC_URL + '/virtualmachines.svg'}')`}
            "background-image": (node) => {
              return `url(${process.env.PUBLIC_URL + node.data("img")}')`;
            },
            //'background-fit': 'contain',
            //'background-color' : 'transparent'
            //node => { return iconPrefix + '/' + node.data('img') },
          },
        },
        {
          selector: "node:selected",
          style: {
            "border-width": "4",
            "border-color": "borderColor",
          },
        },
        {
          selector: "edge",
          style: {
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
            width: 6,
            "line-color": "lineColor",
            "arrow-scale": "1.5",
            "target-arrow-color": "lineColor",
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
            // 'font-size': '20%',
            // 'text-outline-color': textColorOutline,
            "text-outline-width": "4",
          },
        },
      ]}
      layout={layout}
    />
  );
};

export default CytoScape;
