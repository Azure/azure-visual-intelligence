const nodeStyles = [
  {
    selector: "node",
    style: {
      "background-width": "90%",
      "background-height": "90%",
      //if label is empty we display ID, ID can't be empty
      label: (node) => {
        return node.data("label") ? node.data("label") : node.data("id");
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
    },
  },
];
const edgeStyles = [
  {
    selector: "edge",
    style: {
      "target-arrow-shape": "triangle",
      "curve-style": "bezier",
      width: 6,
      "arrow-scale": "1.5",
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
      //"font-size": "15vh",
      // 'color': textColor,
      "text-valign": "top",
      "text-margin-y": "10vh",
      "font-size": "20",
      // 'text-outline-color': textColorOutline,
      //"text-outline-width": "4",
    },
  },
];

export default [...nodeStyles, ...edgeStyles];
