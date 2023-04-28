import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../redux/states/user";
import { getMorty } from "../../services/auth.service";

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const login = async () => {
    try {
      const result = await getMorty();
      dispatch(createUser(result))
      navigate('/', {replace: true})
    } catch (error) {
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <button onClick={login}>LOGIN</button>
    </div>
  )
}