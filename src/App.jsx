import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NewAppointment from "./components/NewAppointment";
import stateReducer from "./stateReducer";
import appointmentContext from "./appointmentContext";
import { useEffect, useReducer, useState } from "react";
import Nav from "./components/Nav";
import axios from "axios"
import Login from "./components/Login";

// const initialState = {
//   : [
//     { id: 1, name: "Dr. Jane Doe" }, 
//     { id: 2, name: "Dr. Karl Marx" }],
//   appointments: [
//     { id: 1, date: "2021-02-03", provider_id: 1, patient: "David Smith", new_patient: true},
//     { id: 2, date: "2021-02-04", provider_id: 1, patient: "Ben Smith", new_patient: true},
//     { id: 3, date: "2021-02-05", provider_id: 2, patient: "Jane Smith", new_patient: false},
//   ],
// };

const initialState = {
  providers: [],
  appointments: [],
  token: null
};

function App() {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const { providers, appointments } = state
  
  const authAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Authorization: `Bearer ${state.token}`,
    },
  });

  useEffect(async () => {
    if (!state.token) return;
    const res = await authAxios.get(`providers`);
    dispatch({
      type: "setProviders",
      providers: res.data,
    });
  }, [state.token]);

  useEffect(async () => {
    if (!state.token) return;
    const appointments_res = await authAxios.get(`appointments`);
    console.log(appointments_res)
    dispatch({
      type: "setAppointments",
      appointments: appointments_res.data,
    });
  }, [state.token]);

  return (
    <appointmentContext.Provider value={{ state, dispatch }}>
      {state.token ? (
      <BrowserRouter>
        <Nav />
        <h1> Appointments </h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/appointment/new/:provider_id"
            element={<NewAppointment />}
          />
          <Route path="*" element={<h4>Page not found.</h4>} />
        </Routes>
      </BrowserRouter>
) : (
  <Login />
)}
    </appointmentContext.Provider>
  );
}

export default App;
