import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, StatusBar, TouchableWithoutFeedback, Keyboard, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from "../misc/colors";
import Constans from 'expo-constants'
import BarraDePesquisa from "../components/BarraDePesquisa";
import BtnIcon from "../components/BtnIcon"
import NoteInputModal from "../components/NotaInputModal";
import Nota from "../components/Nota";
import { useNotas } from "../context/NotaProvisoria";
import SemResultado from "../components/SemResultado";

const reverterData = data => {
    return data.sort((a, b)=> {
        const aInt = parseInt(a.time)
        const bInt = parseInt(b.time)
        if(aInt < bInt) return 1;
        if(aInt == bInt) return 0;
        if(aInt > bInt) return -1;
    })
}


const TelaNota = ({ user, navigation }) => {
    const [greet, setGreet] = useState('');
    const [modalVisible, setModalVisible] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [resultadoNaoEncontrado, setResultadoNaoEncontrado] = useState(false)

    const { notas, setNotas, findNotes } = useNotas();


    const findGreet = () => {
        const hrs = new Date().getHours()
        setGreet((hrs === 0 || hrs < 12) ? 'Bom Dia'
            : (hrs === 1 || hrs < 17) ? 'Boa Tarde'
                : 'Boa Noite'
        )
    }

    const handleOnSubmit = async (title, desc) => {
        const nota = { id: Date.now(), title, desc, time: Date.now() }
        const updatedNotas = [...notas, nota];
        setNotas(updatedNotas)
        await AsyncStorage.setItem('notas', JSON.stringify(updatedNotas))
    };


    useEffect(() => {
        //AsyncStorage.clear();
        findNotes()
        findGreet()
    }, [])

    const reverterNotas = reverterData(notas)

    const abrirNota = (nota) => {
        navigation.navigate('DetalheNota', { nota })
    }

    const handleOnSearchInput = async (texto) => {
        setSearchQuery(texto);
        if (!texto.trim()) {
            setSearchQuery('')
            setResultadoNaoEncontrado(false)
            return await findNotes()
        }
        const filteredNotes = notas.filter(nota => {
            if (nota.title.toLowerCase().includes(texto.toLowerCase())) {
                return nota
            }
        })

        if (filteredNotes.length) {
            setNotas([...filteredNotes])
        } else {
            setResultadoNaoEncontrado(true);
        }
    }

    const handleOnClear = async () =>{
        setSearchQuery('')
        setResultadoNaoEncontrado(false)
        await findNotes()
    }

    return (
        <>
            <StatusBar barStyle={'dark-content'} style={{ zIndex: 2 }} backgroundColor={colors.DARK} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={styles.header}>{` ${greet} ${user.name}`}</Text>
                    {
                        notas.length ?
                            <BarraDePesquisa
                                value={searchQuery}
                                onChangeText={handleOnSearchInput}
                                containerStyle={{ marginVertical: 15 }}
                                onClear={handleOnClear}

                            />
                            : null
                    }

                    {resultadoNaoEncontrado 
                        ? <SemResultado />
                        :
                        <FlatList
                            data={reverterNotas}
                            numColumns={2}
                            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 20 }}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) => <Nota onPress={() => abrirNota(item)} item={item} />}
                        />
                    }
                    {(!notas.length) ?
                        (
                            <View style={[StyleSheet.absoluteFillObject, styles.emptyHeadeContainer]}>
                                <Text style={styles.emptyHeader}>Adicionar Notas</Text>

                            </View>
                        )
                        : null
                    }

                    <BtnIcon
                        antIconName={"plus"}
                        style={styles.addBtn}
                        onPress={() => setModalVisible(true)}
                    />
                </View>

            </TouchableWithoutFeedback>

            <NoteInputModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleOnSubmit}
            />
        </>
    )
}

const styles = StyleSheet.create({

    header: {
        fontSize: 25,
        fontWeight: 'bold',
    },

    container: {
        marginTop: Constans.statusBarHeight,
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 0,
        zIndex: 1

    },

    emptyHeader: {
        fontSize: 25,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        opacity: 0.2
    },

    emptyHeadeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#5b8b5b',
        zIndex: -1,
    },

    addBtn: {
        position: 'absolute',
        right: 20,
        bottom: 50,
    }
})

export default TelaNota;