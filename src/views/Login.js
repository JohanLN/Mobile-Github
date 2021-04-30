import * as React from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { storeUser } from '../controllers';
import { useTheme } from '@react-navigation/native';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            githubLogin: ""
        }
    }
    

    render() {
        const { colors } = this.props.theme;

        return (
            <View style={styles.container}>
                <Text style={[styles.h1, {color: colors.important}]}>MobileGithub app</Text>
                <KeyboardAvoidingView behavior="height" style={[styles.formContainer, {backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1}]}>
                    <View style={styles.inputContainer}>
                        <Text style={[styles.labels, {color: colors.text}]}>Enter your github login</Text>
                        <TextInput onChangeText={(text) => this.setState({githubLogin: text})} style={[styles.textInput, {borderColor: colors.border}]} />
                    </View>
                    <TouchableOpacity onPress={async () => {
                        await storeUser({githubUser: true, login: this.state.githubLogin}, []);
                        this.props.navigation.push("Tab")}
                    } style={{backgroundColor: colors.border, borderRadius: 100, paddingVertical: "3%"}}>
                        <Text style={[styles.clickableText, {color: colors.card}]}>Login</Text>
                    </TouchableOpacity>
                    <Text style={[styles.labels, {color: colors.text}]}>Or</Text>
                    <TouchableOpacity onPress={async () => {
                        await storeUser({githubUser: false}, []);
                        this.props.navigation.push("Tab")}
                    }  style={{borderColor: colors.border, borderWidth: 0.5, borderRadius: 100, paddingVertical: "3%"}}>
                        <Text style={[styles.clickableText, {color: colors.clickableText}]}>Continue as a guest !</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )

    }
}

export default function(props) {
    const theme = useTheme();
  
    return <Login {...props} theme={theme} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    h1: {
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 50,
        textAlign: 'center'
    },
    formContainer: {
        flex: 1,
        marginVertical: "20%",
        marginHorizontal: "10%",
        borderRadius: 20,
        paddingHorizontal: "8%",
        justifyContent: 'space-evenly',
    },
    textInput: {
        marginTop: 20,
        borderWidth: 0.5,
        borderRadius: 20,
    },
    labels: {
        fontSize: 12,
        fontStyle: 'italic',
        color: 'grey',
        textAlign: 'center'
    },
    clickableText: {
        alignSelf: 'center',
        fontSize: 16,
    }
})