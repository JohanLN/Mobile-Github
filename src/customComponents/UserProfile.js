import * as React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { Repositories } from '../customComponents';
import { useTheme } from '@react-navigation/native';

class ClassUserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.user = props.user
    }

    render() {
        const { colors } = this.props.theme;
        return (
            <View  style={styles.container}>
                {!this.user.githubUser ? 
                <View  style={{flex: 1, justifyContent: 'center', paddingHorizontal: "10%"}}>
                    <Text style={{color: colors.text, fontSize: 16, textAlign: 'center'}}>You have to be connected with a github account to access to this functionality. Please try to connect with a github account !</Text>
                    <Image source={require("../../public/images/githuberror.png")} style={{resizeMode: 'contain', alignSelf: 'center', width: "50%", marginTop: "20%"}} />
                    <Text style={{color: colors.text, fontSize: 12, textAlign: 'center'}}>Unauthorized : 401</Text>
                </View>
                :
                <View style={styles.container}>
                    <View style={styles.header}>                    
                        <View style={styles.userUtils}>
                            <Image 
                                source={{uri: this.user.avatar_url}}
                                style={{width: 120, height: 120,  resizeMode: 'contain', borderRadius: 100, marginLeft: "10%"}}
                            />
                            <View style={styles.userDescription}>
                                <Text style={{fontSize: 15, color: colors.important, fontWeight: 'bold', marginVertical: "5%"}}>{this.user.login}</Text>
                                <Text style={{fontSize: 13, color: colors.text}}>{this.user.public_repos} Public repos</Text>
                                <Text numberOfLines={1} style={{fontSize: 13, color: colors.text, fontStyle: 'italic'}}>{this.user.bio === null ? "No description." : this.user.bio}</Text>
                                <TouchableOpacity onPress={() => Linking.openURL(this.user.html_url)}>
                                    <Text numberOfLines={1} style={{color: colors.clickableText, fontStyle: 'italic', marginVertical: "5%", flexWrap: 'wrap'}}>{this.user.html_url}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.push('FollowersView', {login: this.user.login})} style={styles.userInfos}>
                            <View style={{marginRight: '20%'}}>
                                <Text style={{fontSize: 40, color: colors.clickableText, textAlign: 'center'}}>{this.user.followers}</Text>
                                <Text style={{fontSize: 20, color: colors.clickableText, textAlign: 'center'}}>Followers</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.repositories}>
                        <FlatList 
                            data={this.user.repositories}
                            keyExtractor={(item, index) => index}
                            renderItem={({item, index}) => (
                                <Repositories repos={item} navigation={this.props.navigation} />
                            )}
                        />
                    </View>
                </View>
                }
            </View>
        )
    }
}

export function UserProfile(props) {
    const theme = useTheme();
  
    return <ClassUserProfile {...props} theme={theme} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: "40%",
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: '#4b6d9b',
    },
    repositories: {
        flex: 1,
        paddingHorizontal: "5%",
        marginTop: "5%"
    },
    userInfos: {
        flex: 1,
        alignSelf: 'center'
    },
    userUtils: {
        justifyContent: 'space-around',
    },
    userDescription: {
        marginTop: '10%',
        marginLeft: "8%",
        width: '70%'
    },
})