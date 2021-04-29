import * as React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Linking } from 'react-native';

export class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.user = props.user
    }

    render() {

        console.log(this.user);
        return (

            <View>
                <Text>{this.user.login}</Text>
                <Text>{this.user.myBio}</Text>
                <Image source={{uri: this.user.myAvatar}} style={{width: 50, height: 50,  resizeMode: 'contain'}} />
                <Text>Followers : {this.user.myFollowers}</Text>
                <Text>Number of public repositories : {this.user.numberOfRepos}</Text>
                <TouchableOpacity onPress={() => Linking.openURL(this.user.myGithubUrl)}>
                    <Text>{this.user.myGithubUrl}</Text>
                </TouchableOpacity>
                <FlatList 
                    data={this.user.myRepositories}
                    keyExtractor={(item, index) => index}
                    renderItem={({item, index}) => (
                        <View style={{borderWidth: 0.2, marginTop: 5}}>
                            <Text>{item.name}</Text>
                        </View>
                    )}
                />
            </View>

        )

    }

}