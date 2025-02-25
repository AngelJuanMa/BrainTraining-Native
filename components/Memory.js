import React, { useState, Component } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, Animated, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import AsyncStorage from '@react-native-community/async-storage';

const CountDownComponent = ({ starting, record, score }) => (
    <View View style={styles.sectionContainer} >
        <Text style={styles.boxContainer} >{record}</Text>
        <CountdownCircleTimer
            style={styles.boxContainer, styles.countdownCircleTimer}
            isPlaying={starting}
            duration={60}
            size={172}
            strokeWidth={24}
            colors={[
                ['#ffa521', 0.4],
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
        <Text style={styles.boxContainer}>{score}</Text>
    </View >
)

export default class Memory extends Component {
    state = {
        fontsLoaded: false,
        letters: true,
        numbers: true,
        inGame: false,
        cantWN: 4,
        speed: 1000,
        record: 0,
        score: 100,
        hits: 0,
        wrongs: 0,
        answer: '',
        question: '',
        questionVisibility: true,
        stopVisibilityInterval: [false],
    }

    loadFonts = async () => {
        await Font.loadAsync({
            'OpenSans-Bold': require('../assets/fonts/OpenSans-Bold.ttf')
        });
        this.setState({ fontsLoaded: true });
    }

    generateRandomStrings = () => {
        var lista = []
        var letras = 'abcdefghijklmnopqrstuvwxyz';
        var numeros = '0123456789';
        var characters = ''

        if (this.state.letters) characters += letras;
        if (this.state.numbers) characters += numeros;

        //Saca un numero o letra aleatoria
        var charactersLength = characters.length;
        for (var i = 0; i < this.state.cantWN; i++) {
            lista.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
        }

        this.setState({
            question: lista,
            questionVisibility: true
        });
    }

    questVisibility = () => {
        const timerVal = setTimeout(() => {
            this.setState({ questionVisibility: false })
        }, this.state.speed);
    }

    answerRandomStrings = () => {
        let res = this.state.answer.current.value
        this.setState({
            answer: ''
        })
        if (res === this.state.question) {
            this.changeSpeedAlgorithm("WELL");
            let newPoints = (this.state.cantWN * 10) / (this.state.speed / 1000)
            let points = (this.state.score + newPoints)
            points = Math.round(points);
            this.setState({
                bien: this.state.bien + 1,
                score: points,
                stopVisibilityInterval: [hits + wrongs: true]
            });
        }
        else {
            this.changeSpeedAlgorithm("BAD");
            this.setState({
                mal: this.state.mal + 1,
                stopVisibilityInterval: [hits + wrongs: true]
            });
        }

        this.randomNumber();
    }

    start = () => {
        this.generateRandomStrings()
        this.questVisibility()
    }

    onChangeAnswer = (text) => {
        this.setState({
            answer: text
        })
    }

    getStorage = async () => {
        AsyncStorage.multiGet(['hits', 'wrong', 'lastScore', 'cantWN', 'record', 'lastSpeed']).then(response => {
            this.setState({
                score: JSON.parse(response[2][1]),
                cantWN: JSON.parse(response[3][1]),
                record: JSON.parse(response[4][1]),
                lastSpeed: JSON.parse(response[5][1]),
            })

        })
    }

    componentDidMount() {
        this.loadFonts();
        this.getStorage();
    }

    render() {
        if (this.state.fontsLoaded) {
            return (

                <View>
                    <CountDownComponent record={this.state.record} score={this.state.score} starting={this.state.inGame} />
                    {!this.state.inGame ?

                        <View style={styles.containPropieties}>
                            <View>
                                <View style={styles.flewRow}>
                                    <Text style={styles.textStyle}>Desaparecera en: {this.state.speed / 1000} s</Text>
                                    <View>
                                        <TouchableOpacity onPress={() => { this.setState({ speed: this.state.speed + 1000 }) }}>
                                            <Ionicons color={'white'} name='caret-up-outline' size={40} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { if (this.state.speed > 1) this.setState({ speed: this.state.speed - 1000 }) }} >
                                            <Ionicons color={'white'} name='caret-down-outline' size={40} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.flewRow}>
                                    <Text style={styles.textStyle}>Letras y números: {this.state.cantWN} </Text>
                                    <View>
                                        <TouchableOpacity onPress={() => this.setState({ cantWN: this.state.cantWN + 1 })}>
                                            <Ionicons color={'white'} name='caret-up-outline' size={40} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { if (this.state.cantWN > 2) this.setState({ cantWN: this.state.cantWN - 1 }) }}>
                                            <Ionicons color={'white'} name='caret-down-outline' size={40} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.flewRow}>
                                    <TouchableOpacity onPress={() => {
                                        if (this.state.numbers === true) this.setState({ letters: !this.state.letters })
                                    }
                                    }>
                                        {this.state.letters ?
                                            <Ionicons color={'white'} name="checkbox-outline" size={35} />
                                            :
                                            <Ionicons color={'white'} name="square-outline" size={35} />
                                        }
                                    </TouchableOpacity>
                                    <Text style={[styles.textStyle, styles.paddingTopSecond]}>Letras</Text>
                                </View>
                                <View style={[styles.flewRow, styles.paddingBottomToButton]}>
                                    <TouchableOpacity onPress={() => {
                                        if (this.state.letters === true) this.setState({ numbers: !this.state.numbers })
                                    }
                                    }>
                                        {this.state.numbers ?
                                            <Ionicons color={'white'} name="checkbox-outline" size={35} />
                                            :
                                            <Ionicons color={'white'} name="square-outline" size={35} />
                                        }
                                    </TouchableOpacity>
                                    <Text style={[styles.textStyle, styles.paddingTopSecond]}>Números</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.buttonStart}
                                onPress={() => {
                                    this.setState({ inGame: true })
                                    this.start()
                                }} >
                                <Text style={styles.textStyle, styles.textButtonStart}>Empezar</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.containPropieties}>
                            <Text style={styles.textStyle, styles.hits}>{this.state.hits}</Text>
                            <Text style={styles.textStyle, styles.wrongs}>{this.state.wrongs}</Text>
                            {this.state.questionVisibility &&
                               <Text style={styles.textStyle}>{this.state.question}</Text> 
                            }
                            
                            <TextInput
                                autoCapitalize='none'
                                autoCompleteType='off'
                                autoCorrect={false}
                                autoFocus={true}
                                caretHidden={false}
                                maxLength={this.state.cantWN}
                                placeholder='Respuesta'
                                style={styles.input}
                                onChangeText={text => this.onChangeAnswer(text)}
                                value={this.state.answer}
                            />
                        </View>
                    }


                </View>
            )
        } else {
            return null;
        }
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
    hits: {
        color: 'green',
        fontSize: 25,
        paddingBottom: 10
    },
    wrongs: {
        color: '#ca1111',
        fontSize: 25,
    },
    input: {
        height: 30,
        width: 190,
        color: '#202020',
        backgroundColor: '#fff',
        borderColor: 'white',
        textAlign: 'center',
        fontFamily: 'OpenSans-Bold',
        borderWidth: 1,
    },
    time: {
        color: '#ffa521',
        fontFamily: 'OpenSans-Bold',
        fontSize: 40,
    },
    buttonUp: {
        marginBottom: 20
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
        fontSize: 30
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
