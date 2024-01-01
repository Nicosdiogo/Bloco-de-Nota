import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons'
import colors from "../misc/colors";

const BtnIcon = ({ antIconName, size, color, style, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.icon, { ...style }]}
            onPress={onPress}
            color={color || colors.LIGHT}
        >
            <AntDesign
                name={antIconName}
                size={size || 24}

            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    icon: {
        backgroundColor: colors.PRIMARY,
        padding: 15,
        borderRadius: 30,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
    },

})

export default BtnIcon;