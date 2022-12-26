function useAuthorization() {
  const token = localStorage.getItem("accessToken");

  return {
    isAuth: !!token,
  }
}

export default useAuthorization;
