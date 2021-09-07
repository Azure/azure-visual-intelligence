import { React, useEffect } from "react";
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

  const elements = {
    nodes: [
      { data: { id: "vnetA" } },
      { data: { id: "subnetA", parent: "vnetA" } },
      { data: { id: "subnetB", parent: "vnetA" } },
      { data: { id: "subnetC", parent: "vnetA" } },

      {
        data: {
          id: "A1",
          parent: "subnetA",
          img: "/assets/img/azure/original/microsoft.network/loadbalancers.svg",
        },
      },
      {
        data: {
          id: "A2",
          parent: "subnetA",
          img: "/assets/img/azure/original/microsoft.compute/virtualmachines.svg",
        },
      },
      {
        data: {
          id: "A3",
          parent: "subnetA",
          img: "/assets/img/azure/original/microsoft.compute/virtualmachines.svg",
        },
      },

      {
        data: {
          id: "B1",
          parent: "subnetB",
          img: "/assets/img/azure/original/microsoft.network/loadbalancers.svg",
        },
      },
      {
        data: {
          id: "B2",
          parent: "subnetB",
          img: "/assets/img/azure/original/microsoft.compute/virtualmachines.svg",
        },
      },
      {
        data: {
          id: "B3",
          parent: "subnetB",
          img: "/assets/img/azure/original/microsoft.compute/virtualmachines.svg",
        },
      },
    ],
    edges: [
      { data: { id: "A1A2", source: "A1", target: "A2" } },
      { data: { id: "A1A3", source: "A1", target: "A3" } },

      { data: { id: "B1B2", source: "B1", target: "B2" } },
      { data: { id: "B1B3", source: "B1", target: "B3" } },

      { data: { id: "A2B1", source: "A2", target: "B1" } },
      { data: { id: "A3B1", source: "A3", target: "B1" } },
    ],
  };
  /*    { data: { id: 'vnetA' },  img: 'default.svg' },

      { data: { id: 'subnetA', parent: 'vnetA' },  img: 'default.svg'},
      { data: { id: 'subnetB', parent: 'vnetA' },  img: 'default.svg'},
      { data: { id: 'subnetC', parent: 'vnetA' },  img: 'default.svg'},

      { data: { id: 'A1', parent: 'subnetA' },  img: 'default.svg'},
      { data: { id: 'A2', parent: 'subnetA' },  img: 'microsoft.compute/virtualmachines.svg'},
      { data: { id: 'A3', parent: 'subnetA' },  img: 'microsoft.computevirtualmachines.svg'},
      { data: { id: 'A1A2', source: 'A1', target: 'A2' } },
      { data: { id: 'A1A3', source: 'A1', target: 'A3' } },

      { data: { id: 'B1', parent: 'subnetB' },  img: 'default.svg'},
      { data: { id: 'B2', parent: 'subnetB' },  img: 'microsoft.compute/virtualmachines.svg'},
      { data: { id: 'B3', parent: 'subnetB' },  img: 'microsoft.compute/virtualmachines.svg'},
      { data: { id: 'B1B2', source: 'B1', target: 'B2' } },
      { data: { id: 'B1B3', source: 'B1', target: 'B3' } },

      { data: { id: 'C1', parent: 'subnetC' },  img: 'microsoft.compute/virtualmachines.svg'},
      { data: { id: 'C2', parent: 'subnetC' },  img: 'microsoft.compute/virtualmachines.svg'},
      { data: { id: 'C3', parent: 'subnetC' },  img: 'microsoft.compute/virtualmachines.svg'},
      { data: { id: 'C1C2', source: 'C1', target: 'C2' } },
      { data: { id: 'C1C3', source: 'C1', target: 'C3' } },

*/

  /*   { data: { id: 'e' },  img: 'default.svg' },
      { data: { id: 'f', parent: 'e' },   img: 'microsoft.compute\virtualmachines.svg'},
       

      { data: { id: 'eb', source: 'e', target: 'vnetA' } }*/

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
            //   'label': node => { return getLabel(node) }, //decodeURIComponent(node.data(labelField)) },
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
      /*  cy={(cy) => {
        this.cy = cy;
      }}*/
    />
  );
};

export default CytoScape;
