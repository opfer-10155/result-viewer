import CounterHookComponent from '../components/CounterHook'
import { withLayout, MainLayout } from '../components/layout'


export const CounterHook = withLayout(MainLayout)(CounterHookComponent)

export default CounterHook
