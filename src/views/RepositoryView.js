import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { getSpeceficRepo, getReposIssues, getReposContrib } from '../network';
import { RepositoriesDtails } from '../customComponents';

class RepositoryView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            issues: [],
            contributors: [],
            repo: {}
        }
    }

    componentDidMount = async () => {
        const response = await getSpeceficRepo(this.props.route.params.owner, this.props.route.params.repos)
        const issues = await getReposIssues(this.props.route.params.owner, this.props.route.params.repos)
        const contrib = await getReposContrib(this.props.route.params.owner, this.props.route.params.repos);
        this.setState({repo: response, issues: issues, contrib: contrib});
    }

    render() {
        const { colors } = this.props.theme;

        return (
            <View style={styles.container}>
                {this.state.repo.owner === undefined ? 
                    <ActivityIndicator size="large" color="#EE6C4D" />
                :
                    <RepositoriesDtails repo={this.state.repo} contributors={this.state.contributors} issues={this.state.issues} navigation={this.props.navigation} />
                }
            </View>
        )

    }

}

export default function(props) {
    const theme = useTheme();
  
    return <RepositoryView {...props} theme={theme} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
})