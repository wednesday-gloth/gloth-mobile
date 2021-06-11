import * as React from 'react';
import {Text, View} from 'react-native';

const MyPageScreen = (): JSX.Element => {
    return (
        <View>
            <Text>Hello World!</Text>
        </View>
    );
};

MyPageScreen.navigationOptions = {
    title: 'MyPage',
};

export default MyPageScreen;
