import * as React from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TextInput } from 'react-native';
import { getSpeceficUser, getUserRepos, searchReposByName } from '../network';
import { storeUser, getUser, deleteUser } from '../controllers'
import { useTheme } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { Repositories } from '../customComponents';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            inputBorder: '#4b6d9b',
            searchRepos: "",
            repositories: [],
            loading: true
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
    }

    componentWillUnmount = async () => {
        await deleteUser();
    }

    searchingRepositories = async () => {
        this.setState({repositories: await searchReposByName(this.state.searchRepos)})
    }

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
})