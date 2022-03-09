import { call, put, select } from "redux-saga/effects";
import {
  setDiagramResources,
  setDiagramRelations,
} from "../../ducks/diagramSlice";
import { AVIresource, AVIrelation } from "../../../interfaces";
import { armEngine } from "../../../resourcesengines/arm/arm";

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
/* we accept payload as any for backwards compatibility
 * Change payload to AVIresource[]
 * should be removed when toolbox is updated
 */
function* AddResourceToDiagram(
  payload: any,
  diagramResources: any
): Generator<any, [AVIresource[], AVIrelation[]], any> {
  /* we accept payload as "any" for backwards compatibility
   * payload should be changed to AVIresource[] when toolbox is updated
   */
  //this should be removed later on but is used to create a proper list if need be.
  if (!Array.isArray(payload)) {
    //if payload is a unique item we want to make it a list.
    payload = [payload];
  }
  //update payload resources from toolbox to resource of AVIresource type
  let resources: AVIresource[] = yield call(
    updateToolboxResourcestoAVIresources,
    payload
  );

  console.log("resources", resources);
  //Now we are working on legit AVIresource type.
  //We ask armEngine to complete the list of resources with related resources and provide ARM info to all thoses resources
  var relations: AVIrelation[] = [];
  [resources, relations] = yield call(
    armEngine.GetResourcesAndRelatedResources,
    resources
  );

  //What we want to do next is create the relationship from all Engine

  return [resources, relations];
}

function updateToolboxResourcestoAVIresources(Toolboxes: any) {
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
