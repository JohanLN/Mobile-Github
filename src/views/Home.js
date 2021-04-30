import * as React from 'react';
import { View, Button, ActivityIndicator, Text } from 'react-native';
import { getSpeceficUser, getUserRepos } from '../network';
import { storeUser, getUser, deleteUser } from '../controllers'
import { useTheme } from '@react-navigation/native';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    componentDidMount = async () => {
        this.setState({user: await getUser()})
        console.log('sjdiojcsopi', this.state.user)
        if (this.state.user.githubUser && this.state.user.bio === undefined) {
            if (!this.state.user.myBio) {
                const user = await getSpeceficUser(this.state.user.login);
                const userRepos = await getUserRepos(this.state.user.login);
                await storeUser(user, userRepos);
                this.setState({user: await getUser()})
            }
        }
    }

    componentWillUnmount = async () => {
        await deleteUser();
    }

    render() {
        const { colors } = this.props.theme;

        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: colors.text}}>coucou</Text>
                {this.state.user.githubUser === undefined ?
                    <ActivityIndicator size="large" color="#EE6C4D" />
                    :
                    <Button onPress={async () => {
                        this.props.navigation.push("test")}
                    } accessibilityLabel="Hello" title="Home" />
                }
            </View>
        )
    }
}

export default function(props) {
    const theme = useTheme();
  
    return <Home {...props} theme={theme} />;
}
