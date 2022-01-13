//const LABELMAXCHAR = 11;
/*var makeLabel = function (node: any) {
  return node.data("label")
    ? node.data("label").length > LABELMAXCHAR + 3
      ? node.data("label").substring(0, LABELMAXCHAR) + "..."
      : node.data("label")
    : node.data("id");
};*/

const nodeStyles = [
  {
    selector: "node",
    css: {
      width: "38px",
      height: "38px",
      "font-family": "Nokia Pure Regular",
      "background-opacity": "1",
      shape: "roundrectangle",
    },
    /*style: {
      "background-width": "90%",
      "background-height": "90%",
      //if label is empty we display ID, ID can't be empty
      label: (node) => {
        return makeLabel(node);
      },
      shape: "roundrectangle",
      width: "128",
      height: "128",
      "font-family": '"Segoe UI", Arial, Helvetica, sans-serif',
      "font-size": "20",
      "text-valign": "bottom",
      "background-opacity": 0,
      "background-image": (node) => {
        return `url(${process.env.PUBLIC_URL + node.data("img")}')`;
      },
      "border-width": (node) => {
        return node.data("RecommandationsASC") ? 4 : 0;
      },
      "border-color": (node) => {
        return node.data("RecommandationsASC") ? "red" : "#DADADA";
      },
    },*/
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
      "border-width": "4",
      "border-opacity": 0.3,
      "background-opacity": 0.1,
      shape: "roundrectangle",
      "font-family": '"Segoe UI", Arial, Helvetica, sans-serif',
      "text-valign": "top",
      "text-margin-y": "10vh",
      "font-size": "20",
    },
  },
];

const array = [...nodeStyles, ...edgeStyles];
export default array;
