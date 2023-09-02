function hub(props) {
  useEffect(() => {
    const cookies = new Cookies();
    let isLoggedIn = false;
    isLoggedIn = cookies.get("ckeckToken");
    isLoggedIn ? getInformation() : navigate("/login");
  }, []);
  return;
}

export default hub;
