import * as React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectedRecords} from '../store/DictionarySlice';
import DictionaryRecordItem from '../organisms/DictionaryRecordItem';

const DictionaryRecordsScreen = (): JSX.Element => {
    const records = useSelector(selectedRecords);
    return (
        <View>{
            records.map(record => {
                return <DictionaryRecordItem item={record}/>
            })
        }</View>
    );
}

DictionaryRecordsScreen.navigationOptions = {
    title: 'Records',
};

export default DictionaryRecordsScreen;
