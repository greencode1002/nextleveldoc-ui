import { all, fork } from "redux-saga/effects";
//layout
import LayoutSaga from "./Admin/layouts/saga";
//Auth
import authSaga from "./Authentication/saga";
import doctorSaga from "./Doctors/saga";
import patientSaga from "./Patients/saga";
import nurseSaga from "./Nurse/saga";



export default function* rootSaga() {
  yield all([
    //public
    fork(LayoutSaga),
    fork(authSaga),

    fork(doctorSaga),
    fork(patientSaga),
    fork(nurseSaga),

  ]);
}
