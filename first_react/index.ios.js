/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Component,
    AlertIOS
} = React;

class first_react extends Component {
    
    render() {
        return (
                <View style={styles.container}>
                <Text>
                Welcome to React Native!
                </Text>
                <TouchableHighlight style={styles.button}
                onPress={this.showAlert}>
                <Text style={styles.buttonText}>Go</Text>
                </TouchableHighlight>
                </View>
                );
    }
    
    showAlert() {
        AlertIOS.alert('Awesome Alert', 'This is my first React Native alert.', [{text: 'Thanks'}] );
    }
};

var styles = StyleSheet.create({
                               container: {
                               flex: 1,
                               justifyContent: 'center',
                               alignItems: 'center',
                               backgroundColor: '#FFFFFF'
                               },
                               buttonText: {
                               fontSize: 18,
                               color: 'white',
                               alignSelf: 'center'
                               },
                               button: {
                               height: 44,
                               flexDirection: 'row',
                               backgroundColor: '#48BBEC',
                               alignSelf: 'stretch',
                               justifyContent: 'center'
                               }
                               });

AppRegistry.registerComponent('first_react', () => first_react);
