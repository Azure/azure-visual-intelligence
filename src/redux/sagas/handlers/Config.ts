import { call, put, select } from "redux-saga/effects";
import { setSettings} from "../../ducks/settingsSlice";

export function* handleLoadConfig(action: any): Generator<any, any, any> {
  try {
    //Get Global Conf
    const global_location = window.location.href.toString() + "config/global.json";
    const response = yield call(fetch, global_location);
    var global_conf = yield call([response, response.json]);

    //Expand Global Conf
    //Expand Azure resources
    const ref_location = window.location.href.toString() + global_conf.resources.ref;
    const resourcesresponse = yield call(fetch, ref_location); 
    const data = yield call([resourcesresponse, resourcesresponse.json]);
    global_conf.resources = data;

    //Expand layouts
    var extended_layout =[];
    for (const layout of global_conf.layout)
    {
        const ref_location = window.location.href.toString() + layout.ref;
        const response = yield call(fetch, ref_location); 
        const data = yield call([response, response.json]);
        extended_layout.push(data);
    }
    global_conf.layout = extended_layout;
   
    
   yield put(setSettings(global_conf));

  } catch (error) {
    console.log(error);
  }
}