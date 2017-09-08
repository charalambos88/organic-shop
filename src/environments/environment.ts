// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
  	    apiKey: "AIzaSyAvLwX-o0QIRr4oFqqkChumgg13VVp5NxI",
    authDomain: "oshop-webone.firebaseapp.com",
    databaseURL: "https://oshop-webone.firebaseio.com",
    projectId: "oshop-webone",
    storageBucket: "",
    messagingSenderId: "161138780942"
  }
};
