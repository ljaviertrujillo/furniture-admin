import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearLocalStorage } from "../../utilities";
import { resetUser, userKey } from "../../redux/states/user";
import { PublicRoutes } from "../../models";

import { UtilityButton } from "../Button";
import { ButtonType } from "../Button/UtilityButton";

import { AiOutlinePoweroff } from "react-icons/ai";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    clearLocalStorage(userKey);
    dispatch(resetUser());
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
  };

  return (
    <UtilityButton
      type={ButtonType.LARGE}
      title="Cerrar sesion"
      handle={logout}
      icon={<AiOutlinePoweroff />}
    />
  );
}
