import React from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";
import Constans from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
import colors from "../misc/colors";

const BarraDePesquisa = ({ containerStyle, value, onClear, onChangeText }) => {

    return (
        <View style={[styles.container, { ...containerStyle }]}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder="Buscar"
                style={styles.BarraDePesquisa}
            />
            {
                value ?
                    <AntDesign
                        name="close"
                        size={20}
                        color={colors.PRIMARY}
                        onPress={onClear}
                        style={styles.limparIcon}
                    />
                : null
            }
        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        marginVertical: 20,
        justifyContent: 'center'
    },

    BarraDePesquisa: {
        borderWidth: 0.5,
        borderColor: colors.PRIMARY,
        height: 40,
        borderRadius: 40,
        paddingLeft: 15,
        fontSize: 15

    },

    limparIcon: {
        position: 'absolute',
        right: 10,

    }

})

export default BarraDePesquisa;