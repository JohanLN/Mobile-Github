import * as React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Linking, StyleSheet, AsyncStorage } from 'react-native';
import { Repositories } from '../customComponents';

export class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.user = props.user
    }

    render() {
        console.log(this.user);
        return (
            <View style={styles.container}>
                <View style={styles.header}>                    
                    <View style={styles.userUtils}>
                        <Image 
                            source={{uri: this.user.avatar}}
                            style={{width: 120, height: 120,  resizeMode: 'contain', borderRadius: 100, marginLeft: "10%"}}
                        />
                        <View style={styles.userDescription}>
                            <Text style={{fontSize: 15, color: '#EE6C4D', fontWeight: 'bold'}}>{this.user.login}</Text>
                            <Text style={{fontSize: 13, color: 'grey', fontStyle: 'italic'}}>{this.user.bio}</Text>
                            <TouchableOpacity onPress={() => Linking.openURL(this.user.githubUrl)}>
                                <Text style={{color:"#4b6d9b", fontStyle: 'italic'}}>{this.user.githubUrl}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.userInfos}>
                        <View style={styles.userCounters}>
                            <Text style={{fontSize: 30, color: '#EE6C4D'}}>{this.user.followers}</Text>
                            <Text style={{fontSize: 12, color: '#EE6C4D'}}>Followers</Text>
                        </View>
                        <View style={styles.userCounters}>
                            <Text style={{fontSize: 30, color: '#EE6C4D'}}>{this.user.numberOfRepos}</Text>
                            <Text style={{fontSize: 12, color: '#EE6C4D'}}>Public repos</Text>
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
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e242f'
    },
    header: {
        height: "35%",
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: "#1e242f",
        borderBottomWidth: 0.5,
        borderColor: "#4b6d9b"
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