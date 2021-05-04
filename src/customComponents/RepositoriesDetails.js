import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { useTheme } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getFavoriteRepos, storeFavoriteRepos } from '../controllers';


export class ClassRepositoriesDetails extends React.Component {

    constructor(props) {
        super(props);
        this.repo = props.repo,
        this.contrib = props.contributors,
        this.issues = props.issues,
        this.state = {
            isAlreadyFav: false,
            storage: [],
            favNow: false
        }
    }

    favRepo = async () => {
        let storageCpy = this.state.storage

        if (storageCpy === null) {
            storageCpy.push(this.repo)
        }
        else if (this.state.isAlreadyFav) {
            return;
        }
        else {
            storageCpy.push(this.repo)
        }
        await storeFavoriteRepos(storageCpy)
        this.setState({favNow: true})
    }

    componentDidMount = async () => {
        let storage = await getFavoriteRepos();
        if (storage !== null)
            this.setState({storage: storage, isAlreadyFav: storage.find(data => data.id === this.repo.id) !== undefined})
    }

    render () {
        const { colors } = this.props.theme;
        return (

            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {this.props.navigation.push('UserView', {login: this.repo.owner.login})}} style={styles.avatarName}>
                        <Image source={{uri: this.repo.owner.avatar_url}} style={{resizeMode: 'contain', width: 120, height: 120, borderRadius: 100, marginTop: '5%'}} />
                        <Text style={{fontSize: 16, color: colors.clickableText, fontWeight: 'bold', textAlign: 'center', marginVertical: "10%"}}>{this.repo.owner.login}</Text>
                    </TouchableOpacity>
                    <View style={{justifyContent: 'center', marginLeft: "5%"}}>
                        <Text style={{fontSize: 20, color: colors.important, fontWeight: 'bold', flexWrap: 'wrap'}}>{this.repo.name}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{marginTop: "20%"}}>
                                <TouchableOpacity onPress={() => {this.props.navigation.push('ContribView', {contrib: this.contrib })}}>
                                    <Text style={{fontSize: 16, color: colors.clickableText, marginBottom: '20%'}}>{this.contrib.length} {this.contrib.length > 1 ? "contributors" : "contributor"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {this.props.navigation.push('IssuesView', {issues: this.issues })}}>
                                    <Text style={{fontSize: 16, color: colors.clickableText}}>{this.issues.length} {this.issues.length > 1 ? "issues" : "issue"}</Text>
                                </TouchableOpacity>
                            </View>
                            <MaterialIcons name={this.state.isAlreadyFav || this.state.favNow ? "favorite" : "favorite-border"} color='red' size={40} onPress={() => this.favRepo()} style={{alignSelf: 'center', marginLeft: '15%'}} />
                        </View>
                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={{marginTop: "10%", marginLeft: "5%", color: colors.important}}>Description</Text>
                    <Text style={{fontSize: 18, color: colors.text, padding: "8%", textAlign: 'center', fontWeight: 'bold', borderWidth: 1, borderColor: 'grey', marginHorizontal: "5%", borderRadius: 10, backgroundColor: colors.card}}>{this.repo.description === null ? "No desription for this repository." : this.repo.description }</Text>
                    <Text style={{marginTop: "10%", marginLeft: "5%", color: colors.important}}>Informations</Text>
                    <View style={{ height: "40%", justifyContent: 'space-evenly', flexDirection: 'column', borderWidth: 1, borderColor: 'grey', marginHorizontal: "5%", borderRadius: 10, padding: "5%", backgroundColor: colors.card}}>
                        <View style={{flexDirection: 'row'}}>
                            <MaterialIcons name='public' size={25} color={this.repo.private ? 'red' : 'green'} />
                            <Text style={{fontSize: 15, color: colors.text, marginLeft: "10%"}}>{this.repo.private ? "This is a private repository." : "This is a public repository."}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <MaterialCommunityIcons name='code-braces' size={25} color={this.repo.fork ? 'red' : 'green'} />
                            <Text style={{fontSize: 15, color: colors.text, marginLeft: "10%"}}>{this.repo.fork ? "This repository is a fork from another repository." : "This is the original repository."}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <MaterialCommunityIcons name='weight' size={25} color={colors.important} />
                            <Text style={{fontSize: 15, color: colors.text, marginLeft: "10%"}}>{this.repo.size} KB</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <MaterialCommunityIcons name='source-branch' size={25} color={colors.important} />
                            <Text style={{fontSize: 15, color: colors.text, marginLeft: "10%"}}>{this.repo.default_branch}</Text>
                        </View>
                    </View>
                </View>
            </View>

        )

    }

}

export function RepositoriesDtails(props) {
    const theme = useTheme();
  
    return <ClassRepositoriesDetails {...props} theme={theme} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: '#4b6d9b'
    },
    avatarName: {
        marginLeft: "5%",
        justifyContent: 'space-evenly'
    },
    body: {
        flex: 1,
    }
})