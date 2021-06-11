import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import * as Icon from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

interface Props {
  skipLoadingScreen?: boolean;
}

export default class App extends React.Component<Props> {
  public state = {
    isLoadingComplete: false,
  };

  public loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        ...Icon.Ionicons.font,
      }),
    ]);
  };

  public handleLoadingError = (error: Error) => {
    console.warn(error);
  };

  public handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  public render(): JSX.Element {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;
    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          // @ts-ignore
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    return (
      <Provider store={store}>
        <PersistGate loading={<View />} persistor={persistor}>
          <ActionSheetProvider>
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <AppNavigator />
            </View>
          </ActionSheetProvider>
        </PersistGate>
      </Provider>
    );
  }
}
