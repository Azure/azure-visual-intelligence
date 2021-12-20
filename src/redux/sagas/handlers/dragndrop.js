import { call, put, select } from "redux-saga/effects";
import { setDiagramResources } from "../../ducks/diagramSlice";
import { azGetARMResourceGroup } from "../../../api/azure/azarm";

export const getAccessToken = (state) => state.user.accessToken;
//import { useSelector } from "react-redux";

export const getDiagramResources = (state) => state.diagram.resources;

export function* handleDragnDrop(action) {
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

function* AddResourceToDiagram(accessToken, payload, diagramResources) {
  if (!Array.isArray(payload)) {
    //if payload is a unique item we want to make it a list.
    payload = [payload];
  }
  var returnElements;
  var resources = yield call(enrichResourcesARM, [accessToken, payload]);
  if (diagramResources.length === 0) {
    //if diagramResources is currently empty, payload becomes the diagram resources
    returnElements = resources;
  } else {
    //if we have existing items we want to add only new ones
    returnElements = [...resources];

    //for each new element we want to do enrichment of the properties
    //But if we do this in the loop it will be resource per resource, what we want is a bulk ARM query per RG, so we move that

    console.log("there");
    for (const resource of resources) {
      if (!returnElements.find((element) => element.id === resource.id)) {
        returnElements.push(resource);
      }
    }
  }
  return [...returnElements];
}

function* enrichResourcesARM([accessToken, resources]) {
  var ResourceGroupList = new Set();
  for (var resource of resources) {
    // We want to pick only resources
    // ! Should pick only Existing Microsoft resources -> not done yet
    if (
      resource.type !== "microsoft.resources/subscriptions" &&
      resource.type !== "ManagementGroup" &&
      resource.type !== "microsoft.resources/subscriptions/resourcegroups"
    ) {
      //We add their resource group to the list
      ResourceGroupList.add(resource.TreeParentID);
    }
  }
  for (var resourceGroup of ResourceGroupList) {
    var resourceGroupARM = yield call(azGetARMResourceGroup, [
      accessToken,
      resourceGroup,
    ]);

    //for each reco
    /*for (var reco of resourceGroupARM) {
      // we may have multiple resourceidentifies for one reco, so for each resourceidentifiers
      for (var id of reco.properties.resourceIdentifiers) {
        //if the resourceidentifer is about an Azure resource
        if (id.azureResourceId !== "undefined") {
          //we want to get the index of the Resource related to it
          var resourceIndex = resources.findIndex(
            (r) => r.TreeID === id.azureResourceId
          );
          console.log(resourceIndex);
          //if we found an index that we have in resources
          if (resourceIndex !== -1) {
            //we edit the resources list
            //yield put(addResourceRecommandationASC({ reco, resourceIndex }));
          }
        }
      }
    }*/
  }
}
