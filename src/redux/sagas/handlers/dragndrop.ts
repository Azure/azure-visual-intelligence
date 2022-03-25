import { call, put, select } from "redux-saga/effects";
import {
  setDiagramResources,
  setDiagramRelations,
} from "../../ducks/diagramSlice";
import { AVIresource, AVIrelation } from "../../../interfaces";
import { armEngine } from "../../../resourcesengines/arm/arm";
import { argEngine } from "../../../resourcesengines/arg/arg";

export const getDiagramResources = (state: any) => state.diagram.resources;

export function* handleDragnDrop(action: any): Generator<any, any, any> {
  try {
    const currentDiagramResources = yield select(getDiagramResources);
    const [resources, relations] = yield call(
      AddResourceToDiagram,
      action.payload,
      currentDiagramResources
    );
    yield put(setDiagramResources(resources));
    yield put(setDiagramRelations(relations));
  } catch (error) {
    console.log(error);
  }
}

function* AddResourceToDiagram(
  payload: AVIresource,
  diagramResources: any
): Generator<any, [AVIresource[], AVIrelation[]], any> {
  console.log("payload", payload);

  var resources: AVIresource[] = [];
  var relations: AVIrelation[] = [];

  [resources, relations] = yield call(argEngine.GetResourceAndChilds, payload);

  console.log("resources", resources);
  console.log("relations", relations);

  [resources, relations] = yield call(
    armEngine.GetResourcesAndRelatedResources,
    resources,
    relations
  );

  return [resources, relations];
}

/*function updateToolboxResourcestoAVIresources(Toolboxes: any) {
  let payload: AVIresource[] = [];
  for (const resource of Toolboxes) {
    let AVIresource: AVIresource = {
      AVIresourceID: resource.TreeID.toLowerCase(),
      resourcegroup: resource.resourceGroup.toLowerCase(),
      subscription: resource.subscriptionId.toLowerCase(),
      type: resource.type.toLowerCase(),
      name: resource.name.toLowerCase(),
      enrichments: {
        ARG: {
          parent: resource.TreeParentID.toLowerCase(),
        },
      },
    };
    payload.push(AVIresource);
  }
  return payload;
}
*/
