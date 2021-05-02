import * as React from 'react';
import { View, TextInput, ActivityIndicator, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { getUser, storeUser } from '../controllers';
import { useTheme } from '@react-navigation/native';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            githubLogin: "",
            inputBorder: '#4b6d9b',
            errorMessage: "",
            user: {},
            loading: true
        }
    }
    
    loginMethod = async () => {
        if (this.state.githubLogin === "") {
            this.setState({
                inputBorder: "red",
                errorMessage: "You have to enter a github login.\nContinue as a guest if you don't have a specific github account."
            });
            return;
        }
        await storeUser({githubUser: true, login: this.state.githubLogin}, []);
        this.props.navigation.push("Tab")
    }

    componentDidMount = async () => {
        this.setState({user: await getUser()});
        this.setState({loading: false})
        if (this.state.user !== null) {
            this.props.navigation.navigate('Tab');
        }
    }

    render() {
        const { colors } = this.props.theme;

        return (
            <View style={styles.container}>
                {this.state.loading ? 
                    <ActivityIndicator size="large" color="#EE6C4D" />
                    :
                    <View style={styles.container}>
                        <Text style={[styles.h1, {color: colors.important}]}>MobileGithub app</Text>
                        <KeyboardAvoidingView behavior="height" style={[styles.formContainer, {backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1}]}>
                            <View style={styles.inputContainer}>
                                <Text style={[styles.labels, {color: colors.text}]}>Enter your github login</Text>
                                <TextInput onChangeText={(text) => this.setState({githubLogin: text})}
                                    placeholder="Your github login"
                                    onFocus={() => {this.setState({inputBorder: "#EE6C4D", errorMessage: ""})}} 
                                    onBlur={() => this.setState({inputBorder: "#4b6d9b"})} 
                                    style={[styles.textInput, {borderColor: this.state.inputBorder}]} />
                                <Text style={[styles.labels, {color: "red"}]}>{this.state.errorMessage}</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.loginMethod()} style={{backgroundColor: colors.border, borderRadius: 100, paddingVertical: "3%"}}>
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
                }
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
        justifyContent: 'center'
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