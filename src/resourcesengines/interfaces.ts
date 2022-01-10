import { AVIresource, AVIrelation } from "./../interfaces";

/**
 * resourcesEngine
 * resourcesEngine is used to provide a new AVIresources list or to complement existing ones with specific AVIresources information from the engine
 */
export abstract class resourcesEngine {
  /**
   * GetResources
   * Get AVIresources from the tenant
   * used to populate toolbox list
   * Return a new list of AVIresources
   */
  //GetResources?(): AVIresource[];

  /**
   * GetResources(resources)
   * Complete each AVIresource item with the info from this resourceEngine
   * @param {AVIresource[]} resources List of AVIresources to get info from this resourceEngine
   */
  //GetResources?(resources: AVIresource[]): AVIresource[];
  //function* GetResources?(resources: AVIresource[]): Generator<
  public static *GetResources(
    resources: AVIresource[]
  ): Generator<any, AVIresource[], any> {
    yield;
    return resources;
  }
  //GetResources? [Symbol.iterator]: () => Generator<any, any, any>

  /**
   * GetRelatedResources
   * Get all the Resources related from this Engine perspective to the evaluated resources and will return the full list of AVIresource (evaluated + new)
   * @param {AVIresource[]} resources List of AVIresources to list related AVIresources from
   */
  public static *GetResourcesAndRelatedResources(
    resources: AVIresource[]
  ): Generator<any, [AVIresource[], AVIrelation[]], any> {
    yield;
    return [resources, []];
  }

  /**
   * GetResourcesParent
   * For all listed AVIresources, provides a parent property field in the enrichment section for the engine.
   * @param {AVIresource[]} resources List of AVIresources that needs a parent property field
   */
  GetResourcesParent?(resources: AVIresource[]): AVIresource[];

  /**
   * GetResourcesFieldName
   * For all listed AVIresources, provides a property based on a query
   * @param resources
   * @param title name of the query, will be used as an id for the query, must be unique
   * @param query query relevant to your engine
   */
  GetResourcesFieldName?(
    resources: AVIresource[],
    title: string,
    query: string
  ): AVIresource[];
}
