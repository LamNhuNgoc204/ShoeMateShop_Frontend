const config = {
    screens: {
      Home: {
        path: "home",
      },
      Profile: {
        path: "profile/:id",
        parse: {
          id: (id) => `${id}`,
        },
      },
      Notifications: "notifications",
      Settings: "settings",
    },
  };
  
  const linking = {
    prefixes: ["demo://app"],
    config,
  };
  
  export default linking;
  