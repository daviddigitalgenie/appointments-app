import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NewAppointment from "./components/NewAppointment";
import stateReducer from "./stateReducer";
import appointmentContext from "./appointmentContext";
import { useReducer } from "react";
import Nav from "./components/Nav";

const initialState = {
  providers: [
    { id: 1, name: "Dr. Jane Doe" }, 
    { id: 2, name: "Dr. Karl Marx" }],
  appointments: [
    { id: 1, date: "2021-02-03", provider_id: 1, patient: "David Smith" },
    { id: 2, date: "2021-02-04", provider_id: 1, patient: "Ben Smith" },
    { id: 3, date: "2021-02-05", provider_id: 2, patient: "Jane Smith" },
  ],
};

function App() {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const { appointments, providers } = state;

  //useEffect, setAppointments setProviders

  return (
    <appointmentContext.Provider value={{ state, dispatch }}>
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
    </appointmentContext.Provider>
  );
}

export default App;
