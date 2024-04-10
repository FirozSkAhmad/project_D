import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ cmp }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("login") === "true") {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, []);

  return cmp;
};

export default Protected;
