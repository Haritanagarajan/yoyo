//Authendication for specific components

export const Auth = {
    //initially its is false
    isAuthenticated: false,
    //login is clicked auth changes to true
    login(callBack) {
        Auth.isAuthenticated = true;
        callBack();
    },
    //logout is clicked auth changes to false
    logout(callBack) {
        Auth.isAuthenticated = false;
        //callback func when auth comp is accessed fakeauth.logout then callback logout is called
        callBack();
    },
};