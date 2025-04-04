// ================== Admin ================================ //

//REGISTER
export const USER_REGISTER = "/users/register"
export const USER_LOGIN = "/users/login"
export const UPDATE_USER = "/users/updateuser"
export const DELETE_USER = "/users/delete"



export const GET_TRANSACTIONS = "/transactions"
export const ADD_TRANSACTIONS = "/transactions/add"
export const GET_DOCTORS = "/users/role/doctor"
export const GET_PATIENTS = "/users/role/patient"
export const GET_PATIENTS_HISTORY = "/patient/patienthistory"

export const GET_PRESCRIPTION = "/prescriptions/patient"
export const ADD_PRESCRIPTION = "/prescriptions/add"

export const DOWNLOAD_PRESCRIPTION = "transactions/download"


export const GET_SYMPTOMS = "/patientsymptoms"
export const ADD_SYMPTOMS = "/patientsymptoms/add"
export const UPDATE_SYMPTOMS = "/patientsymptoms/update"
export const DELETE_SYMPTOMS = "/patientsymptoms/delete"











//LOGIN
export const POST_LGOUT = "/admin/Adminlogout";
// export const POST_LOGIN = "/admin/login";
export const POST_LOGIN = "/auth/signin";


//admin Change Password
export const UPDATE_CHANGE_PASSWORD_ADMIN = "/admin/changePassword";
export const UPDATE_CHANGE_PASSWORD_USER = "/user/changePassword";

export const GET_ALL_USERS = "/user/getUser";
export const CREATE_USERS = "/user/createNewUser";
export const EDIT_USERS = "/user/updateUser";
export const DELETE_USERS = "/user/deleteUser";
export const GET_USER_APPS = "/user/getApp";

export const GET_ALL_APP = "/apps/getAllApp";
export const CREATE_APP = "/apps/addApp";
export const UPDATE_APP = "/apps/updateApp";
export const DELETE_APP = "/apps/deleteApp";

export const GET_CATEGORY = "/category/getCategory"

// ================== Configure App ================================ //

export const GET_REMAINNING_APP = "/apps/getRemainingApp"
export const GET_CONFIGURE_APP = "/apps/getConfigureApp"
export const ADD_CONFIGURE_APP = "/apps/addConfigureApp"
export const UPDATE_CONFIGURE_APP = "/apps/updateConfigureApp"
export const DELETE_CONFIGURE_APP = "/apps/deleteConfigureApp"

export const GET_CONFIG_DATA = "/config/getAllConfig"
export const UPDATE_API_METHOD_CONFIG = "/config/updateAPIMethod"
export const UPDATE_VPNAPI_KEY_CONFIG = "/config/updateVPNAPIKey"
export const UPDATE_IPINFO_TOKEN_CONFIG = "/config/updateIPInfoToken"



// ================== User ================================ //