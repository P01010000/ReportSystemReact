const callbacks = [];

const triggerCallbacks = async () => callbacks.forEach(cb => cb());

export const Login = () => new Promise((resolve, reject) => {
    if (chayns.env.user.isAuthenticated) {
      resolve();
    } else {
      chayns.setAccessTokenChange(true, () => {
        // replace the callback with an empty one
        chayns.setAccessTokenChange(false, () => null);
        triggerCallbacks();
        if (chayns.env.user.isAuthenticated) resolve(); else reject();
      });
      chayns.login();
    }
});

export const RegisterLoginCallback = callback => typeof callback === 'function' && callbacks.push(callback);

export const isAuthenticated = () => chayns.env.user.isAuthenticated;
