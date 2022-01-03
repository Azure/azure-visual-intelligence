import { call, put, select } from "redux-saga/effects";
import { setDiagramResources } from "../../ducks/diagramSlice";
import { azGetARMResourceGroup } from "../../../api/azure/azarm";

export const getAccessToken = (state: any) => state.user.accessToken;
//import { useSelector } from "react-redux";

export const getDiagramResources = (state: any) => state.diagram.resources;

export function* handleDragnDrop(action: any): Generator<any, any, any> {
  try {
    const currentDiagramResources = yield select(getDiagramResources);
    const accessToken = yield select(getAccessToken);

    const response = yield call(
      AddResourceToDiagram,
      accessToken,
      action.payload,
      currentDiagramResources
    );

    yield put(setDiagramResources(response));
  } catch (error) {
    console.log(error);
  }
}

function* AddResourceToDiagram(
  accessToken: any,
  payload: any,
  diagramResources: any
): Generator<any, any, any> {
  if (!Array.isArray(payload)) {
    //if payload is a unique item we want to make it a list.
    payload = [payload];
  }
  var returnElements;
  var resources = yield call(enrichResourcesARM, [accessToken, payload]);
  console.log("BACK TO MAIN");
  console.log(resources);
  if (diagramResources.length === 0) {
    //if diagramResources is currently empty, payload becomes the diagram resources
    returnElements = resources;
  } else {
    //if we have existing items we want to add only new ones
    returnElements = [...resources];

    console.log("there");
    for (const resource of resources) {
      if (!returnElements.find((element) => element.id === resource.id)) {
        returnElements.push(resource);
      }
    }
  }
  return [...returnElements];
}

function* enrichResourcesARM([accessToken, resources]: [any, any]): Generator<
  any,
  any,
  any
> {
  let ResourceGroupList: any[] = []; //new Set();
  var returnElements = [];

  for (let resource of resources) {
    // We want to pick only resources
    // ! Should pick only Existing Microsoft resources -> not done yet
    if (
      resource.type !== "microsoft.resources/subscriptions" &&
      resource.type !== "ManagementGroup" &&
      resource.type !== "microsoft.resources/subscriptions/resourcegroups"
    ) {
      //We add their resource group to the list
      ResourceGroupList.push(resource.TreeParentID);
    }
  }
  for (var resourceGroup of ResourceGroupList) {
    var resourceGroupARM = yield call(azGetARMResourceGroup, [
      accessToken,
      resourceGroup,
    ]);

    console.log(resourceGroupARM);

    for (let resource of resources) {
      // We want to add ARM  only to resources
      if (
        resource.type !== "microsoft.resources/subscriptions" &&
        resource.type !== "ManagementGroup" &&
        resource.type !== "microsoft.resources/subscriptions/resourcegroups" &&
        resource.ARM === undefined
      ) {
        for (var resourcetemplate of resourceGroupARM.template.resources) {
          //if it is same resource we add template to resource
          if (
            resourcetemplate.name === resource.name &&
            resourcetemplate.type.toLowerCase() === resource.type
          ) {
            resource["ARM"] = resourcetemplate;
            break;
          }
        }
      }
      returnElements.push(resource);
    }
  }
  return returnElements;
}
