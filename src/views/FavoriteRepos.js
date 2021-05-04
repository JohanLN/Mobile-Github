import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { getFavoriteRepos } from '../controllers';
import { Repositories } from '../customComponents';

class FavoriteRepos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            repos: []
        };
        
    }

    componentDidMount = async () => {
        this.setState({repos: await getFavoriteRepos()});
    }

    render() {
        const { colors } = this.props.theme;

        return (
            <View style={styles.container}>
                {this.state.repos === null || this.state.repos.length <= 0 ?
                    <Text style={{color: colors.text, fontSize: 16, textAlign: 'center'}}>No favorite repos.</Text>    
                :
                <View style={styles.users}>
                    <FlatList 
                        data={this.state.repos}
                        keyExtractor={(item, index) => index}
                        renderItem={({item, index}) => (
                            <Repositories repos={item} navigation={this.props.navigation} />
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
  
    return <FavoriteRepos {...props} theme={theme} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    users: {
        flex: 1,
        paddingHorizontal: "5%",
        marginTop: "5%"
    },
})