import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import appointmentContext from '../appointmentContext';
import axios from 'axios';

export default function NewAppointment() {
    const [date, setDate] = useState()
    const [patient,setPatient] = useState()
    const params = useParams()
    const navigate = useNavigate()
    const { state, state: { appointments }, dispatch }= useContext(appointmentContext)

    const authAxios = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });

    const handleSubmit = async (event) => {
        
        event.preventDefault()
        const res = await authAxios.post('appointments', {
            date: date, 
            provider_id: params.provider_id, 
            patient: patient, 
        })

        dispatch({
            type: "addAppointment",
            appointment: res.data
        })

        navigate("/")
    }

    return ( 
      <div>
          <h2> New Appointemnt </h2>
          <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="date">Date</label>
                <input 
                    onChange={event => setDate(event.target.value)} 
                    value={date} 
                    type="text"
                />
            </div>
            <div>
                <label htmlFor="patient">Patient</label>
                <input 
                    type="text" 
                    value={patient}
                    onChange={event => setPatient(event.target.value)}    
                />
            </div>
           <button>Add</button>
          </form>
      </div>
  )
}
