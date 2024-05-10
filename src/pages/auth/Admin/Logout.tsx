import { useNavigate } from "react-router-dom";
import { useClientAuth } from "../../provider/authProvider";

const Logout = () => {
  const { setClientAuth  } = useClientAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setClientAuth(null);
    navigate("/", { replace: true });
  };

  setTimeout(() => {
    handleLogout();
  }, 3 * 100);

  return <>Logout Page</>;
};

export default Logout;