import React, { useState, useEffect } from 'react';
import { StyleSheet, SectionList, FlatList, Text, View } from 'react-native';
import Words from './Words';

export default () => {

    let auxWords = new Words;
    let getWordsInEnglish = auxWords.getWordsInEnglish()
    let getWordsInSpanish = auxWords.getWordsInSpanish()
    const [numberOfWord, useStateWordsNumberOfWord] = useState([])
    const [wordsInEnglish, useStateWordsInEnglish] = useState([])
    const [wordsInSpanish, useStateWordsInSpanish] = useState([])

    const setCantOfWords = () => {
        let auxGetWordsInEnglish = [];
        let auxNumberOfWord = []
        for (let i = 0; i < 10; i++) {
            auxNumberOfWord.push(i + 1)
            auxGetWordsInEnglish.push(getWordsInEnglish[i]);
        }
        useStateWordsNumberOfWord(auxNumberOfWord)
        let auxGetWordsInSpanish = [];
        for (let i = 0; i < 10; i++) {
            auxGetWordsInSpanish.push(getWordsInSpanish[i]);
        }
        useStateWordsInEnglish(auxGetWordsInEnglish);
        useStateWordsInSpanish(auxGetWordsInSpanish);
    }

    useEffect(() => {
        setCantOfWords()
    }, [])

    return (
        <View >
            <View >
                <FlatList
                    data={getWordsInEnglish}
                    renderItem={({ item }) => {

                        <Text style={styles.whiteText}>{item}</Text>
                    }
                    }
                    keyExtractor={item => item}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    whiteText: {
        color: 'white'
    },
    item: {
        padding: 10,
        fontSize: 22,
        height: 50,
    },
})
