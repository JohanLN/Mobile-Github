import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

class UserView extends React.Component {

    render() {
        const { colors } = this.props.theme;

        return (
            <View style={styles.container}>
                <Text>UserView</Text>
            </View>
        )

    }

}

export default function(props) {
    const theme = useTheme();
  
    return <UserView {...props} theme={theme} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
})