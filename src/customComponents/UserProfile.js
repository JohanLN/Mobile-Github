import * as React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Linking, StyleSheet, AsyncStorage } from 'react-native';
import { Repositories } from '../customComponents';
import { useTheme } from '@react-navigation/native';

class ClassUserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.user = props.user
    }

    render() {
        const { colors } = this.props.theme;
        console.log(this.user.githubUser)
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
                                source={{uri: this.user.avatar}}
                                style={{width: 120, height: 120,  resizeMode: 'contain', borderRadius: 100, marginLeft: "10%"}}
                            />
                            <View style={styles.userDescription}>
                                <Text style={{fontSize: 15, color: colors.important, fontWeight: 'bold'}}>{this.user.login}</Text>
                                <Text  numberOfLines={1}  style={{fontSize: 13, color: colors.text, fontStyle: 'italic'}}>{this.user.bio}</Text>
                                <TouchableOpacity onPress={() => Linking.openURL(this.user.githubUrl)}>
                                    <Text style={{color: colors.clickableText, fontStyle: 'italic'}}>{this.user.githubUrl}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.userInfos}>
                            <View style={styles.userCounters}>
                                <Text style={{fontSize: 30, color: colors.important}}>{this.user.followers}</Text>
                                <Text style={{fontSize: 12, color: colors.important}}>Followers</Text>
                            </View>
                            <View style={styles.userCounters}>
                                <Text style={{fontSize: 30, color: colors.important}}>{this.user.numberOfRepos}</Text>
                                <Text style={{fontSize: 12, color: colors.important}}>Public repos</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.repositories}>
                        <FlatList 
                            data={this.user.repositories}
                            keyExtractor={(item, index) => index}
                            renderItem={({item, index}) => (
                                <Repositories repos={item} />
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
        height: "35%",
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: '#4b6d9b'
    },
    repositories: {
        flex: 1,
        paddingHorizontal: "5%",
        marginTop: "5%"
    },
    userInfos: {
        height: "100%",
        width: "40%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    userUtils: {
        justifyContent: 'space-around',
        height: "100%"
    },
    userDescription: {
        justifyContent: "space-between",
        height: "30%",
        marginLeft: "8%"
    },
    userCounters: {
        alignItems: 'center',
        height: "40%",
        justifyContent: 'space-around',
        marginRight: "15%"
    }
})