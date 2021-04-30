import * as React from 'react';
import { View, Button, ActivityIndicator } from 'react-native';
import { getSpeceficUser, getUserRepos } from '../network';
import { storeUser, getUser } from '../controllers'
import { UserProfile } from '../customComponents';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    componentDidMount = async () => {
        this.setState({user: await getUser()})
    }

    render() {

        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                {this.state.user.githubUser === undefined ?
                    <ActivityIndicator size="large" color="#EE6C4D" />
                :
                    <UserProfile user={this.state.user} navigation={this.props.navigation} />
                }
            </View>
        )
    }
}

export default Profile;