import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { getReposContrib } from '../network';
import { Users } from '../customComponents';

class ContribView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contrib: []
        };
        
    }

    componentDidMount = async () => {
        this.setState({contrib: this.props.route.params.contrib})
    }

    render() {
        const { colors } = this.props.theme;

        return (
            <View style={styles.container}>
                {this.state.contrib.length <= 0 ?
                    <ActivityIndicator size="large" color="#EE6C4D" />
                :
                <View style={styles.users}>
                    <Text style={{color: colors.important, fontWeight: 'bold', fontSize: 35, textAlign: 'center'}}>Contributors</Text>
                    <FlatList 
                        data={this.state.contrib}
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
  
    return <ContribView {...props} theme={theme} />;
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