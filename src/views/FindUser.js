import * as React from 'react';
import { View, Button } from 'react-native';

class FindUser extends React.Component {

    render() {
        return (
            <View style={{flex: 1}}>
                <Button onPress={async () => {
                    this.props.navigation.push("test")}
                } accessibilityLabel="Hello" title="FindUser" />
            </View>
        )
    }
}

export default FindUser;