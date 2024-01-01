import React, { useState } from "react";
import { View,
    StyleSheet,
    Text, 
    TextInput, 
    StatusBar, 
    Dimensions 
} from "react-native";
import colors from "../misc/colors";
import BtnIcon from "../components/BtnIcon";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Intro = ({onFinish}) => {
    const [name, setName]= useState('')
    const handleOnChangeText = (text) => setName(text);

    const handleSubmit = async () => {
        const user = {name: name}
        await AsyncStorage.setItem('user', JSON.stringify(user))
        {(onFinish) ? onFinish() : null}
    }
    return (
        <>
            <StatusBar barStyle={'dark-content'} style={{zIndex: 2}}  />
            <View style={styles.container}>
                <Text style={styles.inputTitle}> Digite o Seu Nome Para Continuar</Text>
                <TextInput 
                    value={name} 
                    onChangeText={handleOnChangeText} 
                    placeholder="Digite o Seu Nome"
                    style={styles.TextInput} 
                />
               {name.trim().length >= 4  ? (
                <BtnIcon  antIconName='arrowright' onPress={handleSubmit} /> 
                ) : null }
            </View>
        </>
    )
}

const width = Dimensions.get('window').width - 50;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    TextInput: {
        borderWidth: 2,
        borderColor: colors.PRIMARY,
        color: colors.DARK,
        width,
        height: 50,
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 15,
        marginBottom: 15
    },

    inputTitle: {
        alignSelf: 'flex-start',
        paddingLeft: 25,
        marginBottom: 5,
        opacity: 0.5,
    },
})

export default Intro;