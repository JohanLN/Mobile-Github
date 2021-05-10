import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { getFavoriteRepos, getFavoriteUsers } from '../controllers';
import { Repositories, Users } from '../customComponents';

class FavoriteRepos extends React.Component {

    constructor(props) {
        super(props);
        this.colors = this.props.theme;
        this.state = {
            repos: [],
            users: [],
            selection: 'Repos',
        };
        
    }

    componentDidMount = async () => {
        this.setState({repos: await getFavoriteRepos()});
        this.setState({users: await getFavoriteUsers()});

        console.log(this.state.users)
    }

    render() {
        const { colors } = this.props.theme;

        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: "10%"}}>
                    <TouchableOpacity onPress={() => this.setState({selection: 'Repos'})} style={[styles.favSelection, {borderColor: colors.border, backgroundColor: this.state.selection === 'Repos' ? colors.clickableText : colors.background}]}>
                        <Text style={{textAlign: 'center', color: this.state.selection !== 'Repos' ? colors.clickableText : colors.background}}>Repositories</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({selection: 'Users'})} style={[styles.favSelection, {borderColor: colors.border, backgroundColor: this.state.selection === 'Users' ? colors.clickableText : colors.background}]}>
                        <Text style={{textAlign: 'center', color: this.state.selection !== 'Users' ? colors.clickableText : colors.background}}>Users</Text>
                    </TouchableOpacity>
                </View>
                {this.state.selection === 'Repos' ?
                <View style={styles.users}>
                    {this.state.repos === null || this.state.repos.length <= 0 ? 
                    <Text style={{color: colors.text, fontSize: 16, textAlign: 'center', flex: 1, textAlignVertical: 'center'}}>No favorite repos.</Text>
                    : 
                    <FlatList 
                        data={this.state.repos}
                        keyExtractor={(item, index) => index}
                        renderItem={({item, index}) => (
                            <Repositories repos={item} navigation={this.props.navigation} />
                        )}
                    />
                    }
                </View>
                :
                <View style={styles.users}>
                    {this.state.users === null || this.state.users.length <= 0 ? 
                    <Text style={{color: colors.text, fontSize: 16, textAlign: 'center', flex: 1, textAlignVertical: 'center'}}>No favorite users.</Text>
                    :
                    <FlatList 
                        data={this.state.users}
                        keyExtractor={(item, index) => index}
                        renderItem={({item, index}) => (
                            <Users users={item} navigation={this.props.navigation} />
                        )}
                        initialNumToRender={100}
                    />
                    }
                </View>
            }
            </View>
        )

    }

}

export default function(props) {
    const theme = useTheme();
  
    return <FavoriteRepos {...props} theme={theme} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    users: {
        flex: 2,
        paddingHorizontal: "5%",
        marginTop: "5%"
    },
    favSelection: {
        borderRadius: 100,
        width: "40%",
        padding: "3%",
        borderWidth: 2
    }
})