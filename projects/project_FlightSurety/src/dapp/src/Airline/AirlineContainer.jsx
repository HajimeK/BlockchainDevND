import AirlineConsumer from './AirlineConsumer'
import { drizzleConnect } from 'drizzle-react'

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    FlightSuretyApp: state.contracts.FlightSuretyApp,
    drizzle: state.drizzle,
    drizzleStatus: state.drizzleStatus
  }
}


const AirlineContainer = drizzleConnect(
  AirlineConsumer,
  mapStateToProps
)

export default AirlineContainer
