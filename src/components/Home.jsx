import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import appointmentContext from '../appointmentContext';
import AppointmentList from './AppointmentList';
// import AppointmentList from './AppointmentList';

export default function Home() {
  const { state: { providers } } = useContext(appointmentContext)
  return(
    <div>
      {providers.map(provider => (
        <div>
          <h3> {provider.name} <Link to={`/appointment/new${provider.id}`}>New Appointment</Link></h3>
          <AppointmentList provider_id={provider.id} />
        </div>
      ))}
    </div>
  )
}
