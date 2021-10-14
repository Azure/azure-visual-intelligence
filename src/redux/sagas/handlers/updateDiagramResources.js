import { call, put, select } from "redux-saga/effects";
import { setDiagramElements } from "../../ducks/diagramSlice";

export const getDiagram = (state) => state.diagram.elements;
export const getExistingAzureResources = (state) => state.resources;

export function* handleResourceRecommandationsChange() {
  try {
    const currentDiagram = yield select(getDiagram);
    const currentResources = yield select(getExistingAzureResources);

    const response = yield call(
      UpdateDiagram,
      currentDiagram,
      currentResources
    );

    yield put(setDiagramElements(response));
  } catch (error) {
    console.log(error);
  }
}

function UpdateDiagram(diagram, currentResources) {
  var nodes = [];
  diagram.nodes.forEach((existingNode) => {
    var resources = currentResources.find(
      (element) => element.TreeID === existingNode.data.id
    );
    if (resources.hasOwnProperty("RecommandationsASC")) {
      nodes.push({
        data: {
          ...existingNode.data,
          RecommandationsASC: resources.RecommandationsASC,
        },
      });
    } else {
      nodes.push({ ...existingNode });
    }
  });

  var edges = diagram.edges;
  var returnElements = { nodes, edges };
  return returnElements;
}
