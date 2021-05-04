import * as React from 'react';
import { View, ActivityIndicator, BackHandler } from 'react-native';
import { getUser } from '../controllers'
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
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentWillUnmount = () => {
        this.backHandler.remove();
    }

    backAction = () => {
        if (this.props.navigation.isFocused()) {
            this.props.navigation.navigate("Home")
            return true;
        }
      };

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