import React from 'react';
import {Text, View} from 'react-native';
import {DictionaryRecord} from '../store/DictionarySlice';

interface Props {
    item: DictionaryRecord
}

const DictionaryRecordItem = ({item}: Props): JSX.Element => {

    const mainSourceWord = item.sourceWords[0];
    const mainTargetWord = item.targetWords[0];
    return (
        <View>
            <Text key={mainSourceWord.id}>{mainSourceWord.content}</Text>
            <Text style={{textAlign: 'right'}} key={mainTargetWord.id}>{mainTargetWord.content}</Text>
        </View>

    )
}

export default DictionaryRecordItem