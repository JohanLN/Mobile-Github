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
        if (this.state.user.githubUser) {
            if (!this.state.user.myBio) {
                const user = await getSpeceficUser(this.state.user.login);
                const userRepos = await getUserRepos(this.state.user.login);
                await storeUser(user, userRepos);
                this.setState({user: await getUser()})
            }
        }
    }

    render() {

        return (
            <View style={{flex: 1}}>
                {this.state.user.githubUser === undefined ?
                    <ActivityIndicator size="large" color="#326da8" />
                :
                    <UserProfile user={this.state.user} />
                }
            </View>
        )
    }
}

export default Profile;