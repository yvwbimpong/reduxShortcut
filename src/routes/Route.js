import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import AppLanding from '../components/app/index';

const AuthSwitch = createSwitchNavigator({
  Login: {
    screen: Login,
  },
  Signup: {
    screen: Signup,
  },
});

const AppNavigator = createSwitchNavigator({
  Auth: AuthSwitch,
  App: AppLanding,
});

const Route = createAppContainer(AppNavigator);
export default Route;
