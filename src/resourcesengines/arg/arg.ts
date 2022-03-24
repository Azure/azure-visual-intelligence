import { resourcesEngine } from "../interfaces";
import { AVIresource } from "../../interfaces";
import { getAccessToken } from "../../redux/ducks/userSlice";

export class argEngine extends resourcesEngine {
  public static *ListResources(
  ): Generator<any, AVIresource[], any> {
    yield;
    let resources:AVIresource[] = [];
    return resources;
  }


  public static *GetResources(
    resources: AVIresource[]
  ): Generator<any, AVIresource[], any> {
    yield;
    return resources;
  }
}
