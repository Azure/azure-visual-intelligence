import { resourcesEngine } from "../interfaces";
import { AVIresource } from "../../interfaces";

export class argEngine extends resourcesEngine {
  public static *GetResources(
    resources: AVIresource[]
  ): Generator<any, AVIresource[], any> {
    yield;
    return resources;
  }
}
