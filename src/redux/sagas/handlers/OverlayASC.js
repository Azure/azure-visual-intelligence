import { call, put, select } from "redux-saga/effects";
import { azGetResourceGroupASCRecommandations } from "../../../api/azure/azasc";
//import { addResourceRecommandationASC } from "../../ducks/resourcesSlice";
import { handleResourceRecommandationsChange } from "./updateDiagramResources";

export const getDiagram = (state) => state.diagram.elements;
export const getResources = (state) => state.resources;
export const getAccessToken = (state) => state.user.accessToken;

export function* handleHideOverlayASC() {
  try {
    //Hide ASC Overlay
    //const response = yield call(getNodeInfo, action.payload);
    yield console.log("handleHideOverlayASC");
  } catch (error) {
    console.log(error);
  }
}

export function* handleDisplayOverlayASC() {
  try {
    //Generate & display ASC Overlay

    //Get resources from AVI graph
    const currentDiagram = yield select(getDiagram);
    const currentResources = yield select(getResources);
    const accesToken = yield select(getAccessToken);

    //Get resources group list for all resources
    //Get ASC recommandations
    //& Map them to resources
    yield call(AddOverlayASC, [accesToken, currentDiagram, currentResources]);
    //Get ASC recommandations
    //map them to resources
    //Update avi graph state with recommendation from resources states

    //const response = yield call(getNodeInfo, action.payload);
  } catch (error) {
    console.log(error);
  }
}

function* AddOverlayASC([accesToken, diagram, resources]) {
  var ResourceGroupList = new Set();
  for (var element of diagram.nodes) {
    var resource = resources.find((r) => r.TreeID === element.data.id);
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
  //Now we get the ASC recommandations for each ResourceGroup
  for (var resourceGroup of ResourceGroupList) {
    var resourceGroupRecommandations = yield call(
      azGetResourceGroupASCRecommandations,
      [accesToken, resourceGroup]
    );

    //for each reco
    for (var reco of resourceGroupRecommandations) {
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
    }
  }

  yield call(handleResourceRecommandationsChange);
}
