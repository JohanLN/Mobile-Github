import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { getReposIssues } from '../network';
import moment from 'moment';

class IssuesView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            issues: []
        };
        
    }

    componentDidMount = async () => {
        this.setState({issues: this.props.route.params.issues})
    }

    render() {
        const { colors } = this.props.theme;

        return (
            <View style={styles.container}>
                {this.state.issues.length <= 0 ?
                <View>
                    <Text style={{color: colors.text, fontSize: 16, textAlign: 'center'}}>No issues.</Text>
                </View>
                :
                <View style={styles.issues}>
                    <Text style={{color: colors.important, fontWeight: 'bold', fontSize: 35, textAlign: 'center'}}>Issues</Text>
                    <FlatList 
                        data={this.state.issues}
                        keyExtractor={(item, index) => index}
                        renderItem={({item, index}) => (
                            <TouchableOpacity onPress={() => Linking.openURL(item.html_url)} style={[styles.issueCard, {backgroundColor: colors.card, borderColor: colors.border}]}>
                                <Text style={{fontSize: 20, color: colors.clickableText, textAlign: 'center', fontWeight: 'bold'}}>Titre {item.title}</Text>
                                <Text style={{fontSize: 16, color: item.state === 'open' ? 'green' : 'red', fontWeight: 'bold', textAlign: 'right', marginVertical: "10%"}}>Issue {item.state}</Text>
                                <Text style={{color: colors.text}}>Published {moment(item.created_at).fromNow()} by: </Text>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: "5%"}}>
                                    <Image source={{uri: item.user.avatar_url}} style={{resizeMode: 'contain', height: 40, width: 40, borderRadius: 100}} />
                                    <Text style={{color: colors.text, marginLeft: "6%"}}>{item.user.login}</Text>
                                </View>
                            </TouchableOpacity>
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
  
    return <IssuesView {...props} theme={theme} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    issues: {
        flex: 1,
        paddingHorizontal: "5%",
        marginTop: "5%"
    },
    issueCard: {
        borderWidth: 0.5,
        borderRadius: 10,
        padding: '7%',
        marginVertical: "3%"
    }
})