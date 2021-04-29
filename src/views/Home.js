import * as React from 'react';
import { View, Button, ActivityIndicator, Text } from 'react-native';
import { getSpeceficUser, getUserRepos } from '../network';
import { storeUser, getUser } from '../controllers'

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    componentDidMount = async () => {
        this.setState({user: await getUser()})
        if (this.state.user.githubUser) {
            if (!this.state.user.myBio) {
                const user = await getSpeceficUser(this.state.user.login);
                const userRepos = await getUserRepos(this.state.user.login);
                await storeUser(user, userRepos);
                this.setState({user: await getUser()})
            }
        }
    }

    componentWillUnmount = () => {
        console.log("unmount")
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                {this.state.user.githubUser === undefined ?
                    <ActivityIndicator size="large" color="#326da8" />
                :
                    <Button onPress={async () => {
                        this.props.navigation.push("test")}
                    } accessibilityLabel="Hello" title="Home" />
                }
            </View>
        )
    }
}

export default Home;