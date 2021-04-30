import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useTheme } from '@react-navigation/native';


export class ClassRepositories extends React.Component {

    constructor(props) {
        super(props);
        this.repos = props.repos
    }

    colorByLanguage = (language) => {
        switch (language) {
            case "HTML":
                return "orange";
            case "C":
                return "grey";
            case "Java":
                return "#b38300";
            case "JavaScript":
                return "yellow";
            case "Dart":
                return "cyan";
            case "C++":
                return "pink";
            case "Python":
                return "blue";
            case "CSS":
                return "purple";
            default:
                return "green";
        }
    }

    render () {
        const { colors } = this.props.theme;

        return (

            <TouchableOpacity style={[styles.container, {backgroundColor: colors.card}]} onPress={() => this.props.navigation.push('RepositoryView')}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.clickableText}} >{this.repos.name}</Text>
                <Text style={{color: colors.text, fontSize: 12, fontStyle: 'italic', marginTop: "3%"}}>{this.repos.description}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', marginTop: "3%"}}>
                        <Entypo name="code" size={20} color={this.colorByLanguage(this.repos.language)} />
                        <Text style={{color: colors.text, fontSize: 15, marginLeft: 10}}>{this.repos.language}</Text>
                    </View>
                    <Text style={{color: colors.text, fontSize: 12, fontStyle: 'italic', marginTop: "3%"}}>Owner : {this.repos.owner.login}</Text>
                </View>
            </TouchableOpacity>

        )

    }

}

export function Repositories(props) {
    const theme = useTheme();
  
    return <ClassRepositories {...props} theme={theme} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: "#4b6d9b",
        marginVertical: "3%",
        justifyContent: 'space-evenly',
        padding: "7%"
    }
})