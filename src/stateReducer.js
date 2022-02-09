export default function (currentState, action) {
    switch (action.type) {
        case "addAppointment":
            return {
                ...currentState,
                appointments: [action.appointment, ...currentState.appointments]
            }
        case "setToken":
            return {
                ...currentState,
                token: action.data.token
            }
        case "setProviders":
            return {
                ...currentState,
                providers: action.providers
                }
        case "setAppointments":
            return {
                ...currentState,
                appointments: action.appointments
            }

        default:
            return currentState
    }
}