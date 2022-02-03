import React, { useContext } from 'react';
import appointmentContext from '../appointmentContext';

export default function AppointmentList( {provider_id}) {
    const { state: { appointments } } = useContext(appointmentContext)

    return( 
    <div>
        <ul>
        {appointments.filter(appointment => appointment.provider_id == provider_id).map((appointment, index) => (
                <li> {appointment.date} - {appointment.patient} </li>
        ))}
        </ul>
    </div>)
}
