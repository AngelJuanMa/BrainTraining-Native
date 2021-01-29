import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Animated, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';


const CountDownComponent = ({ starting, record, points }) => (
    <View style={styles.sectionContainer}>
        <Text style={styles.boxContainer} >{record}</Text>
        <CountdownCircleTimer
            style={styles.boxContainer, styles.countdownCircleTimer}
            isPlaying={starting}
            duration={60}
            size={172}
            strokeWidth={24}
            colors={[
                ['#ffa521', 0.4],
                ['#ffa5b1', 0.4],
                ['#ffa521', 0.2],
            ]}
            trailColor={'#202020'}
        >
            {({ remainingTime, animatedColor }) => (
                <Animated.Text style={styles.time}>
                    {remainingTime}
                </Animated.Text>
            )}
        </CountdownCircleTimer >
        <Text style={styles.boxContainer}>{points}</Text>
    </View>

)

export default () => {
    const [letters, useStateLetters] = useState(true)
    const [numbers, useStateNumbers] = useState(true)
    const [record, useStateRecord] = useState(0)
    const [points, useStatePoints] = useState(0)
    const [inGame, useStateInGame] = useState(false)
    const [speed, useStateSpeed] = useState(1)
    const [cantWN, useStateCantWN] = useState(2)

    let [fontsLoaded] = useFonts({
        'OpenSans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
    });

    if (!inGame) {
        return (
            <View >
                <CountDownComponent record={record} points={points} />
                <View style={styles.containPropieties}>
                    <View>
                        <View style={styles.flewRow}>
                            <Text style={[styles.textStyle, styles.paddingTopFirst]}>Desaparecera en: {speed} s</Text>
                            <View>
                                <TouchableOpacity onPress={() => useStateSpeed(speed + 1)}>
                                    <Ionicons color={'white'} name='caret-up-outline' size={40} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { if (speed > 1) useStateSpeed(speed - 1) }} >
                                    <Ionicons color={'white'} name='caret-down-outline' size={40} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.flewRow}>
                            <Text style={[styles.textStyle, styles.paddingTopFirst]}>Letras y números: {cantWN} </Text>
                            <View>
                                <TouchableOpacity onPress={() => useStateCantWN(cantWN + 1)}>
                                    <Ionicons color={'white'} name='caret-up-outline' size={40} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { if (cantWN > 2) useStateCantWN(cantWN - 1) }} >
                                    <Ionicons color={'white'} name='caret-down-outline' size={40} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.flewRow}>
                            <TouchableOpacity onPress={() => {
                                if (numbers === true) useStateLetters(!letters)
                            }
                            }>
                                {letters ?
                                    <Ionicons color={'white'} name="checkbox-outline" size={35} />
                                    :
                                    <Ionicons color={'white'} name="square-outline" size={35} />
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
                                    <Ionicons color={'white'} name="checkbox-outline" size={35} />
                                    :
                                    <Ionicons color={'white'} name="square-outline" size={35} />
                                }
                            </TouchableOpacity>
                            <Text style={[styles.textStyle, styles.paddingTopSecond]}>Números</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.buttonStart}
                        onPress={() => useStateInGame(true)} >
                        <Text style={styles.textStyle, styles.textButtonStart}>Empezar</Text>
                    </TouchableOpacity>
                </View>
            </View >

        )
    } else {
        return (
            <View>
                <CountDownComponent starting={true} />
            </View>
        )
    }

}


const styles = StyleSheet.create({
    sectionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containPropieties: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    time: {
        fontSize: 30,
        color: '#ffa521',
        fontFamily: 'OpenSans-Bold',
    },
    buttonStart: {
        backgroundColor: '#ffa521',
        height: 35,
        width: 173,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButtonStart: {
        color: '#181818',
        fontFamily: 'OpenSans-Bold',
    },
    boxContainer: {
        marginTop: 3,
        marginBottom: 3,
        marginLeft: 30,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffa521',
        fontFamily: 'OpenSans-Bold',
        fontSize: 17
    },
    countdownCircleTimer: {
        marginLeft: 15
    },
    remainingTime: {
        fontSize: 46,
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
        alignItems: 'center',
    }
})
