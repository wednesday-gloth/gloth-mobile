import * as React from 'react';
import {useState} from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import * as Icon from '@expo/vector-icons';
import {Provider} from 'react-redux';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import {OpenAPI} from '@wednesday-gloth/gloth-api-client/client/core/OpenAPI';
import {API_URL} from '@env';

OpenAPI.BASE = API_URL

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

interface Props {
    skipLoadingScreen?: boolean;
}

const App = (props: Props): JSX.Element => {
    const [state, setState] = useState({isLoadingComplete: false})
    const handleLoadingError = (error: Error) => {
        console.warn(error);
    };

    const handleFinishLoading = () => {
        setState({isLoadingComplete: true});
    };

    const loadResourcesAsync = async () => {
        return Promise.all([
            Font.loadAsync({
                ...Icon.Ionicons.font,
            }),
        ]);
    };

    const {isLoadingComplete} = state;
    const {skipLoadingScreen} = props;
    if (!isLoadingComplete && !skipLoadingScreen) {
        return (
            <AppLoading
                // @ts-ignore
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={handleFinishLoading}
            />
        );
    }
    return (
        <Provider store={store}>
            <PersistGate loading={<View/>} persistor={persistor}>
                <ActionSheetProvider>
                    <View style={styles.container}>
                        {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                        <AppNavigator/>
                    </View>
                </ActionSheetProvider>
            </PersistGate>
        </Provider>
    );
}

export default App