import { call, put, select } from "redux-saga/effects";
import { setDiagramResources } from "../../ducks/diagramSlice";
import { AVIresource } from "../../../interfaces";
import { armEngine } from "../../../resourcesengines/arm/arm";

export const getDiagramResources = (state: any) => state.diagram.resources;

export function* handleDragnDrop(action: any): Generator<any, any, any> {
  try {
    const currentDiagramResources = yield select(getDiagramResources);
    const response = yield call(
      AddResourceToDiagram,
      action.payload,
      currentDiagramResources
    );
    yield put(setDiagramResources(response));
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
): Generator<any, AVIresource[], any> {
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

  //Now we are working on legit AVIresource type.
  //We ask armEngine to complete the list of resources with related resources and provide ARM info to all thoses resources
  resources = yield call(armEngine.GetResources, resources);

  //What we want to do next is create the relationship from all Engine

  /*var returnElements;
  var resources = yield call(enrichResourcesARM, [accessToken, payload]);
  if (diagramResources.length === 0) {
    //if diagramResources is currently empty, payload becomes the diagram resources
    returnElements = resources;
  } else {
    //if we have existing items we want to add only new ones
    returnElements = [...resources];
    for (const resource of resources) {
      if (!returnElements.find((element) => element.id === resource.id)) {
        returnElements.push(resource);
      }
    }
  }
  return [...returnElements];*/
  return resources;
}

function updateToolboxResourcestoAVIresources(Toolboxes: any) {
  let payload: AVIresource[] = [];
  for (const resource of Toolboxes) {
    let AVIresource: AVIresource = {
      AVIresourceID: resource.TreeID,
      resourcegroup: resource.resourceGroup,
      subscription: resource.subscriptionId,
      type: resource.type,
      name: resource.name,
      enrichments: {
        ARG: {
          parent: resource.TreeParentID,
        },
      },
    };
    payload.push(AVIresource);
  }
  return payload;
}
