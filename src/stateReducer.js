export default function (currentState, action) {
    switch (action.type) {
        case "addAppointment":
            return {
                ...currentState,
                appointments: [action.appointment, ...currentState.appointments]
            }
        case "setAppointments":
            return {
                ...currentState,
                appointments: action.data
            }
        case "setProviders":
            return {
                ...currentState,
                providers: action.data
            }
        default:
            return currentState
    }
}