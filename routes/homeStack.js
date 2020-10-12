import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import PokemonList from '../screens/PokemonList';
import PokemonDetail from '../screens/PokemonDetail';

const screens = {
    Home: {
        screen: PokemonList
    },
    PokemonDetail: {
        screen: PokemonDetail
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);