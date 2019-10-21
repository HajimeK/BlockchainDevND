import AccountConsumer from './AccountConsumer'
import { drizzleConnect } from 'drizzle-react'

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    FlightSuretyApp: state.contracts.FlightSuretyApp,
    drizzle: state.drizzle,
    drizzleStatus: state.drizzleStatus
  }
}


const AccountContainer = drizzleConnect(
  AccountConsumer,
  mapStateToProps
)

export default AccountContainer
