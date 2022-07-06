import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './reduxslice/store';
import RootNavigator from './StackRender';


LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

