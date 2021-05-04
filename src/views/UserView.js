import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { UserProfile } from '../customComponents';
import { getSpeceficUser, getUserRepos } from '../network';

class UserView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
        
    }

    componentDidMount = async () => {
        const user = await getSpeceficUser(this.props.route.params.login);
        const repos = await getUserRepos(this.props.route.params.login)
        let userCpy = user;
        user.repositories = repos;
        user.githubUser = true;
        this.setState({user: userCpy});
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.user.login === undefined ?
                    <ActivityIndicator size="large" color="#EE6C4D" />
                :
                    <UserProfile user={this.state.user} navigation={this.props.navigation} />
                }
            </View>
        )

    }

}

export default function(props) {
    const theme = useTheme();
  
    return <UserView {...props} theme={theme} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
})