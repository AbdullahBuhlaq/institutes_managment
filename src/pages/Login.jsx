import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import validateForm from "../functions/validateForm";
import handleSave from "../functions/handleSave";
import requestOptions from "../constants/requestOptions";
import messages from "../constants/messages";
import NewInput from "../components/general/NewInput";

function Login(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [userErrors, setUserErrors] = useState({});
  const userSchema = {
    username: Joi.string()
      .trim()
      .pattern(/^[A-Za-z]+[a-zA-Z0-9\_\.]*$/)
      .min(3)
      .max(30)
      .required()
      .messages({ ...messages, "string.pattern.base": "يجب أن يتضمن أحرف إنجليزية وأرقام فقط " })
      .label("اسم المستخدم"),
    password: Joi.string().required().min(8).max(50).messages(messages).label("كلمة السر"),
  };
  const joiUser = Joi.object(userSchema);
  const [duringLogin, setDuringLogin] = useState(false);

  async function login(event) {
    const isValid = await validateForm(event, joiUser, user, setUserErrors);
    if (isValid) {
      setDuringLogin(true);
      let body = JSON.stringify({ ...user });
      let response = await fetch(`${import.meta.env.VITE_URL}/auth/login`, { ...requestOptions, body: body });
      let data = await response.json();
      if (data.success) {
        console.log(data);
        localStorage.setItem("user", JSON.stringify({ permission: JSON.parse(data.data.permission).permission, show: JSON.parse(data.data.permission).show, token: data.data.token, role: data.data.name }));
        navigate("/home");
      } else {
        console.log(data.error);
        props.toast.error(data.error, {
          position: props.toast.POSITION.TOP_CENTER,
        });
      }
      setDuringLogin(false);
    } else {
      props.toast.info("أدخل جميع المعلومات بشكل صحيح", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  return (
    <>
      <div className={"popup-box show"}>
        <div className="new-form-container">
          <h1>{"قم بتسجيل الدخول إلى حسابك الشخصي"}</h1>
          <form>
            <div className="row">
              <NewInput placeholder={"أدخل اسم الامستخدم"} label={"اسم المستخدم"} type={"text"} name={"username"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
              <NewInput placeholder={"أدخل كلمة المرور"} label={"كلمة المرور"} type={"password"} name={"password"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
            </div>
            <div className="button-container">
              <button
                onClick={async (event) => {
                  const isValid = await validateForm(event, joiUser, user, setUserErrors);
                  if (isValid) await login(event);
                  else {
                    props.toast.info("أدخل جميع المعلومات بشكل صحيح", {
                      position: props.toast.POSITION.TOP_CENTER,
                    });
                  }
                }}
                disabled={duringLogin}
              >
                تسجيل الدخول
              </button>
            </div>
          </form>
        </div>
        {/* <div className="popup">
          <div className="content">
            <header>
              <p>{"قم بتسجيل الدخول إلى حسابك الشخصي"}</p>
            </header>
            <form>
              <Input label={"اسم المستخدم"} type={"text"} name={"username"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
              <Input label={"كلمة المرور"} type={"password"} name={"password"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
              <button
                onClick={async (event) => {
                  const isValid = await validateForm(event, joiUser, user, setUserErrors);
                  if (isValid) await login(event);
                  else {
                    props.toast.info("أدخل جميع المعلومات بشكل صحيح", {
                      position: props.toast.POSITION.TOP_CENTER,
                    });
                  }
                }}
              >
                تسجيل الدخول
              </button>
            </form>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Login;
