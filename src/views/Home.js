import * as React from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TextInput, BackHandler, Alert, TouchableOpacity } from 'react-native';
import { getSpeceficUser, getUserRepos, searchReposByName } from '../network';
import { storeUser, getUser, deleteUser } from '../controllers'
import { useTheme } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { Repositories } from '../customComponents';
import Modal from 'react-native-modalbox';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            inputBorder: '#4b6d9b',
            searchRepos: "",
            repositories: [],
            loading: true,
            isOpen: false
        }
    }

    componentDidMount = async () => {
        this.setState({user: await getUser()});
        if (this.state.user.githubUser && this.state.user.bio === undefined) {
            if (!this.state.user.myBio) {
                const user = await getSpeceficUser(this.state.user.login);
                const userRepos = await getUserRepos(this.state.user.login);
                await storeUser(user, userRepos);
                this.setState({user: await getUser()});
            }
        }
        if (this.state.user.githubUser !== undefined || this.state.user.githubUser !== null) {
            this.setState({loading: false});
        }
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
          );
    }

    componentWillUnmount = async () => {
        this.backHandler.remove();
        await deleteUser();
    }

    searchingRepositories = async () => {
        this.setState({repositories: await searchReposByName(this.state.searchRepos)})
    }

    logOutModal = () => {
        return (
            <Modal style={{justifyContent: 'center', alignItems: 'center', height: 300, width: 300}} position={"center"}>
                <Text>Test</Text>
            </Modal>
        )
    }

    backAction = () => {
        if (this.props.navigation.isFocused()) {
            this.setState({isOpen: !this.state.isOpen})
            return true;
        }
      };

    render() {
        const { colors } = this.props.theme;

        return (
            <View style={styles.container}>
                {this.state.loading === undefined ?
                    <ActivityIndicator size="large" color="#EE6C4D" />
                    :
                    <View style={styles.container}>
                        <TextInput onChangeText={(text) => this.setState({searchRepos: text})}
                            onSubmitEditing={() => this.searchingRepositories()}
                            placeholder="Search repositories"
                            onFocus={() => {this.setState({inputBorder: "#EE6C4D", errorMessage: ""})}} 
                            onBlur={() => this.setState({inputBorder: "#4b6d9b"})} 
                            style={[styles.textInput, {borderColor: this.state.inputBorder}]} />
                            <Modal style={[styles.logOutModal, {backgroundColor: colors.border}]} isOpen={this.state.isOpen}>
                                <Text style={styles.logOutText}>Do you want to log out ?</Text>
                                <View style={styles.logOutButtonsContainer}>
                                    <TouchableOpacity style={[styles.logOutButtons, {borderColor: colors.card}]} onPress={() => this.setState({isOpen: !this.state.isOpen})}>
                                        <Text style={[styles.clickableText, {color: colors.card}]}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[{backgroundColor: colors.card}, styles.logOutButtons]} onPress={() => this.props.navigation.pop()}>
                                        <Text style={[styles.clickableText, {color: colors.clickableText}]}>Yes</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        {this.state.repositories.length === 0 ? 
                            <View style={styles.container}>
                                <Text  style={{color: colors.text, fontSize: 16, textAlign: 'center'}}>No repositories found.</Text>
                            </View>
                            : 
                            <View style={styles.container}>
                                <FlatList 
                                    data={this.state.repositories}
                                    keyExtractor={(item, index) => index}
                                    renderItem={({item, index}) => (
                                        <Repositories repos={item} navigation={this.props.navigation} />
                                    )}
                                />
                            </View>                        
                        }
                    </View>
                }
            </View>
        )
    }
}

export default function(props) {
    const theme = useTheme();
  
    return <Home {...props} theme={theme} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    textInput: {
        marginTop: 20,
        borderWidth: 0.5,
        borderRadius: 20,
        marginHorizontal: "5%"
    },
    logOutModal: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 300,
        width: 300,
        borderRadius: 10
    },
    logOutText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    logOutButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: "80%"
    },
    logOutButtons: {
        borderWidth: 0.5,
        borderRadius: 100,
        paddingVertical: "3%",
        width: "40%"
    },
    clickableText: {
        alignSelf: 'center',
        fontSize: 14,
    }
})