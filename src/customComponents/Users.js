import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

class ClassUsers extends React.Component {

    constructor(props) {
        super(props);
        this.users = props.users
    }

    render() {
        const { colors } = this.props.theme;

        return (
            <TouchableOpacity style={[styles.container, {backgroundColor: colors.card}]} onPress={() => {
                this.props.navigation.push('UserView', {login: this.users.login})
            }} >
                <Image source={{uri: this.users.avatar_url}} style={{width: 60, height: 60,  resizeMode: 'contain', borderRadius: 100}}/>
                <Text style={{color: colors.text, alignSelf: 'center', marginLeft: "20%"}}>{this.users.login}</Text>
            </TouchableOpacity>
        )

    }

}

export function Users(props) {
    const theme = useTheme();
  
    return <ClassUsers {...props} theme={theme} />;
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: "#4b6d9b",
        flexDirection: "row",
        marginVertical: "3%",
        padding: "7%",
    }
})