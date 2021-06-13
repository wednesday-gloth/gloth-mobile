import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {initApplication} from '../thunks/LifecycleThunks';

const AppContainer = createAppContainer(
    createSwitchNavigator({
        Main: MainTabNavigator,
    })
);

const AppNavigator = (): JSX.Element => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initApplication())
    })
    return (<AppContainer/>)
};

export default AppNavigator
