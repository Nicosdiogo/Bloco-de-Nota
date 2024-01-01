import React from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

const Nota = ({ item, onPress }) => {
    const { title, desc } = item;
    return (

        <TouchableOpacity onPress={onPress} style={styles.container}>


            <Text numberOfLines={2} style={styles.title}>{title}</Text>
            <Text numberOfLines={3}> {desc} </Text>
        </TouchableOpacity>
    )
}

const width = Dimensions.get('window').width - 20

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#78b3d0',
        width: width / 2 - 5,
        padding: 8,
        borderRadius: 5,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },

})

export default Nota;