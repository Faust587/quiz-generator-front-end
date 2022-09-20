function useAuthorization() {
  const token = localStorage.getItem("token");
  if (!token) return false;
  // TODO: Fetch data about user
}

export default useAuthorization;
