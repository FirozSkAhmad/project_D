import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ cmp }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, []);

  return cmp;
};

export default Protected;
