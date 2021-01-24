import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Button, FlatList, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

export default () => {
    const [letters, useStateLetters] = useState(true)
    const [numbers, useStateNumbers] = useState(true)
    const [speed, useStateSpeed] = useState(1)
    const [cantWN, useStateCantWN] = useState(2)

    let [fontsLoaded] = useFonts({
        'OpenSans-Bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
    });

    return (
        <View>
            <View style={styles.flewRow}>
                <Text style={[styles.textStyle, styles.paddingTopFirst]}>Desaparecera en: {speed} s</Text>
                <View>
                    <TouchableOpacity onPress={() => useStateSpeed(speed + 1)}>
                        <Ionicons color={'white'} name='caret-up-outline' size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { if (speed > 1) useStateSpeed(speed - 1) }} >
                        <Ionicons color={'white'} name='caret-down-outline' size={30} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.flewRow}>
                <Text style={[styles.textStyle, styles.paddingTopFirst]}>Letras y números: {cantWN} </Text>
                <View>
                    <TouchableOpacity onPress={() => useStateCantWN(cantWN + 1)}>
                        <Ionicons color={'white'} name='caret-up-outline' size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { if (cantWN > 2) useStateCantWN(cantWN - 1) }} >
                        <Ionicons color={'white'} name='caret-down-outline' size={30} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.flewRow}>
                <TouchableOpacity onPress={() => {
                    if (numbers === true) useStateLetters(!letters)
                }
                }>
                    {letters ?
                        <Ionicons color={'white'} name="checkbox-outline" size={30} />
                        :
                        <Ionicons color={'white'} name="square-outline" size={30} />
                    }
                </TouchableOpacity>
                <Text style={[styles.textStyle, styles.paddingTopSecond]}>Letras</Text>
            </View>
            <View style={[styles.flewRow, styles.paddingBottomToButton]}>
                <TouchableOpacity onPress={() => {
                    if (letters === true) useStateNumbers(!numbers)
                }
                }>
                    {numbers ?
                        <Ionicons color={'white'} name="checkbox-outline" size={30} />
                        :
                        <Ionicons color={'white'} name="square-outline" size={30} />
                    }
                </TouchableOpacity>
                <Text style={[styles.textStyle, styles.paddingTopSecond]}>Números</Text>
            </View>
            <Button color={'#ffa521'} title="Empezar" />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
    },
    textStyle: {
        color: 'white',
        fontFamily: 'OpenSans-Bold',
    },
    paddingTopFirst: {
        paddingTop: 21,
    },
    paddingTopSecond: {
        paddingTop: 6,
        paddingLeft: 7,
    },
    paddingBottomToButton: {
        paddingBottom: 60,
    },
    flewRow: {
        flexDirection: 'row',
    },
})
