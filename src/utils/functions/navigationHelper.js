export const handleNavigate = (navigation, screenName, params = {}) => {
  if (navigation && screenName) {
    navigation.navigate(screenName, params);
  }
};
