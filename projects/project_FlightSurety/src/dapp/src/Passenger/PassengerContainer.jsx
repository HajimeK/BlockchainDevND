import PassengerConsumer from './PassengerConsumer'
import { drizzleConnect } from 'drizzle-react'

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    FlightSuretyApp: state.contracts.FlightSuretyApp,
    drizzle: state.drizzle,
    drizzleStatus: state.drizzleStatus
  }
}


const PassengerContainer = drizzleConnect(
  PassengerConsumer,
  mapStateToProps
)

export default PassengerContainer
