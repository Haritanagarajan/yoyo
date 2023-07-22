//authendication initially it is false
export const Auth = {
    isAuthenticated: false,
    //if login means true
    login(callBack) {
        Auth.isAuthenticated = true;
        callBack();
    },
    //if logout means false
    logout(callBack) {
        Auth.isAuthenticated = false;
        callBack();
    },
};