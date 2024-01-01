import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    StatusBar,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import colors from "../misc/colors";
import Constants from 'expo-constants'
import BtnIcon from "./BtnIcon";

const NotaInputModal = ({ visible, onClose, onSubmit, nota, isEdit }) => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const handleModalClose = () => {
        Keyboard.dismiss();
    }

    useEffect(() => {
        if(isEdit){
            setTitle(nota.title)
            setDesc(nota.desc)
        }
    }, [isEdit])

    const handleOnChangeText = (text, valueFor) => {
        if (valueFor === 'title') setTitle(text);
        if (valueFor === 'desc') setDesc(text);
    }

    const handleSubmit = () =>{
        if(!title.trim() && !desc.trim()) return onClose()

        {(isEdit) ? onSubmit(title, desc, Date.now()) 
            : 
            onSubmit(title, desc)
            setTitle('')
            setDesc('')
            onClose()
        }

        
    }

    const closeModal = () =>{
       if(!isEdit){
        setTitle('')
        setDesc('')
       }
        onClose()
        
    }

    console.log(title, desc)

    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={colors.PRIMARY} />
            <Modal visible={visible} animationType="slide">
                <View style={styles.container}>
                    <TextInput
                        placeholder="Titulo"
                        onChangeText={(text) => handleOnChangeText(text, 'title')}
                        style={[styles.input, styles.title]}
                        value={title}
                    />
                    <TextInput
                        placeholder="Nota"
                        multiline
                        onChangeText={(text) => handleOnChangeText(text, 'desc')}
                        style={[styles.input, styles.desc]}
                        value={desc}
                    />
                    <View style={styles.btnContainer} >
                        <BtnIcon
                            size={15} 
                            antIconName={'check'} 
                            onPress={handleSubmit} 
                            style={styles.submit} 
                        />
                        { title.trim() || desc.trim() ? <BtnIcon
                            size={15}
                            antIconName={'close'}
                            onPress={closeModal}
                            style={styles.close} 
                        /> : null}
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={handleModalClose}>
                    <View style={[styles.modalBG, StyleSheet.absoluteFillObject]}>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 20,


    },

    input: {
        borderBottomWidth: 2,
        borderBottomColor: colors.PRIMARY,
        fontSize: 20,
        color: colors.DARK,

    }
    ,
    title: {
        height: 40,
        marginBottom: 15,
        fontWeight: 'bold'
    },

    desc: {
        height: 100,

    },

    modalBG: {
        flex: 1,
        zIndex: -1
    },

    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
    },

    close:{
        backgroundColor: 'rgba(220, 0, 0, 0.7)',
        marginLeft: 15
    },

    submit:{
        backgroundColor: '#20b20b2b',
    }

})


export default NotaInputModal;