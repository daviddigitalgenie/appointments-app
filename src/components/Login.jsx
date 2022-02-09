import React, { useContext, useState } from "react";
import appointmentContext from "../appointmentContext";
import api from "../api";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(appointmentContext);

  async function submit(e) {
    e.preventDefault();
    const user = { email, password };
    // addEntry(params.cat_id, {code: code, name: "name", quantity: quantity, total_value: total_value})
    const res = await api.post("users/login", user);
    if (res.request.status === 200) {
      dispatch({
        type: "setToken",
        data: res.data,
      });
    } else {
      setErrorMessage(res.error);
    }
  }

  return (
    <>
      <h1> Login </h1>
      {errorMessage && <h4 style={{ color: "red" }}>{errorMessage}</h4>}
      <form onSubmit={submit}>
        <div>
          <label>Email</label>
          <input onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button type="submit"> Login </button>
      </form>
    </>
  );
}