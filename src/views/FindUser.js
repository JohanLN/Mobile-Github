import * as React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { searchtUsersByName } from '../network';
import { useTheme } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { Users } from '../customComponents';

class FindUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            inputBorder: '#4b6d9b',
            searchUsers: "",
            users: []
        }
    }

    searchingUsers = async () => {
        this.setState({users: await searchtUsersByName(this.state.searchUsers)})
    }

    render() {
        const { colors } = this.props.theme;

        return (
            <View style={styles.container}>
                <TextInput onChangeText={(text) => this.setState({searchUsers: text})}
                    onSubmitEditing={() => this.searchingUsers()}
                    placeholder="Search users"
                    onFocus={() => {this.setState({inputBorder: "#EE6C4D", errorMessage: ""})}} 
                    onBlur={() => this.setState({inputBorder: "#4b6d9b"})} 
                    style={[styles.textInput, {borderColor: this.state.inputBorder}]} />
                {this.state.users.length === 0 ? 
                    <View style={styles.container}>
                        <Text  style={{color: colors.text, fontSize: 16, textAlign: 'center'}}>No users found.</Text>
                    </View>
                    : 
                    <View style={styles.users}>
                        <FlatList 
                            data={this.state.users}
                            keyExtractor={(item, index) => index}
                            renderItem={({item, index}) => (
                                <Users users={item} navigation={this.props.navigation} />
                            )}
                        />
                    </View>                        
                }
            </View>
        )
    }
}


export default function(props) {
    const theme = useTheme();
  
    return <FindUser {...props} theme={theme} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    textInput: {
        marginTop: 20,
        borderWidth: 0.5,
        borderRadius: 20,
        marginHorizontal: "5%"
    },
    users: {
        flex: 1,
        paddingHorizontal: "5%",
        marginTop: "5%"
    },
})