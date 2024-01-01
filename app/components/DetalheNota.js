import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements';
import colors from "../misc/colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotas } from "../context/NotaProvisoria";
import NotaInputModal from "./NotaInputModal";
import BtnIcon from "./BtnIcon";

const DetalheNota = (props) => {
    const [nota, setNota] = useState(props.route.params.nota)
    const HeaderHeight = useHeaderHeight()
    const { setNotas } = useNotas();
    const [showModal, setShowModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)


    const apagarNota = async () => {
        const resultado = await AsyncStorage.getItem('notas')
        let notas = []
        if (resultado !== null) notas = JSON.parse(resultado)

        const novaNota = notas.filter(n => n.id !== nota.id)
        setNotas(novaNota)
        await AsyncStorage.setItem('notas', JSON.stringify(novaNota))
        props.navigation.goBack()
    }

    const displayAlertaApagar = () => {
        Alert.alert('Você tem certeza ?', 'Essa acção vai apagar sua nota permanentemente!', [
            {
                text: 'Apagar',
                onPress: apagarNota
            },
            {
                text: 'Não Obrigado',
                onPress: () => console.log('Não obrigado')
            }
        ], {
            cancelable: true,
        })
    }

    const handleUpdate = async (title, desc, time) => {
        const resultado = await AsyncStorage.getItem('notas')
        let notas = []
        if (resultado !== null) notas = JSON.parse(resultado)

        const novaNota = notas.filter(n => {
            if (n.id === nota.id) {
                n.title = title
                n.desc = desc
                n.isUpdated = true
                n.time = time

                setNota(n)
            }
            return n;

            

        })
        setNotas(novaNota)
        await AsyncStorage.setItem('notas', JSON.stringify(novaNota))
    }
    const handleOnClose = () => setShowModal(false)

    const formatoData = (ms) => {
        const data = new Date(ms)
        const dia = data.getDate()
        const mes = data.getMonth() + 1
        const ano = data.getFullYear()
        const hrs = data.getHours()
        const min = data.getMinutes()
        const sec = data.getSeconds()

        return `${dia}/${mes}/${ano} - ${hrs}:${min}:${sec}`
    }

    const abrirEditModal = () => {
        setIsEdit(true)
        setShowModal(true)
    }
    return (
        <>
            <ScrollView contentContainerStyle={[styles.container, { paddingTop: HeaderHeight }]}>
                <Text style={styles.tempo}>
                    {nota.isUpdated 
                    ? `Atualizado em: ${formatoData(nota.time)} `
                    : `Criado em: ${formatoData(nota.time)} `}
                </Text>
                <Text style={styles.title}> {nota.title} </Text>
                <Text style={styles.desc}> {nota.desc} </Text>


            </ScrollView>

            <View style={styles.btnContainer}>
                <BtnIcon
                    antIconName={'delete'}
                    style={{ backgroundColor: '#b83535', marginBottom: 15 }}
                    onPress={displayAlertaApagar}
                />
                <BtnIcon
                    antIconName={'edit'}
                    onPress={abrirEditModal}
                    style={{ backgroundColor: '#a5cddf' }}

                />
            </View>
            <NotaInputModal isEdit={isEdit} nota={nota} onClose={handleOnClose} onSubmit={handleUpdate} visible={showModal} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingHorizontal: 10
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },

    desc: {
        fontSize: 18,
        opacity: 0.6,
        paddingTop: 5,
        textAlign: 'justify'
    },

    tempo: {
        textAlign: 'right',
        fontSize: 12,
        opacity: 0.5
    },

    btnContainer: {
        position: 'absolute',
        right: 15,
        bottom: 50,
    }
})

export default DetalheNota;