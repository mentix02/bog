function redirectToHomeIfAuthenticated(isAuthenticated, history) {
  return () => {
    if (isAuthenticated) {
      history.push("/");
    }
  };
}

export { redirectToHomeIfAuthenticated };
