import { StackNavigator } from 'react-navigation';
import Main from './components/Main';
import List from './components/List';
import Search from './components/Search';

const router = StackNavigator(
    {
        Main: { screen: Main },
        List: { screen: List },
        Search: { screen: Search }
    },
    {
        initialRouteName: 'Main'
    }
)

export default router;