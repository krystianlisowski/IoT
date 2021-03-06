import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Header } from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';
import SQLite from 'react-native-sqlite-storage';

var db = SQLite.openDatabase({ name: 'database.db', createFromLocation: '~www/database.db' });

export default class Devices extends Component {

  constructor(props) {
    super(props);

    this.state = {
      devices: [],
      refreshing: false
    }

  }

  _downloadDataFromDatabase() {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM devices;', [],
        (tx, results) => {
          var devices = [];
          for (let i = 0; i < results.rows.length; i++) {
            devices[i] = results.rows.item(i);
          }
          this.setState({ devices: devices });

        });
    });
  };

  _onRefresh = () => {
    this._downloadDataFromDatabase();
    this.setState({ refreshing: true, devices: [] });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 200)
  }

  async componentDidMount() {

    SplashScreen.hide();
    
    this._downloadDataFromDatabase();
    this._onRefresh();
  }

  goToModalScreen = (componentName, title) => {
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            name: componentName,
            passProps: {
              componentId: componentName,
            },
            options: {
              topBar: {
                title: {
                  text: title
                }
              }
            }
          }
        }]
      }
    });
  }

  goToEditDeleteScreen = (componentName, title, id, name, place, command, colorOfTile) => {
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            name: componentName,
            passProps: {
              componentId: componentName,
              id: id,
              name: name,
              place: place,
              command: command,
              colorOfTile: colorOfTile
            },
            options: {
              topBar: {
                title: {
                  text: title
                }
              }
            }
          }
        }]
      }
    });
  }

  render() {

    let rowsOfTiles = [];
    let row = [];
    for (let i = 0; i < this.state.devices.length; i++) {
      row.push(
        <View key={i}>
          <TouchableOpacity style={
            [styles.tile, { backgroundColor: this.state.devices[i].colorOfTile }]}
            onLongPress={() => this.goToEditDeleteScreen(
              'EditDelete',
              'Edit or delete',
              this.state.devices[i].id,
              this.state.devices[i].name,
              this.state.devices[i].place,
              this.state.devices[i].command,
              this.state.devices[i].colorOfTile,
            )}>
            <Text style={styles.tileTextName}>{this.state.devices[i].id}</Text>
            <Text style={styles.tileTextName}>{this.state.devices[i].name}</Text>
            <Text style={styles.tileTextPlace}>{this.state.devices[i].place}</Text>
          </TouchableOpacity>
        </View>
      );

      if (i % 2 !== 0) {
        rowsOfTiles.push(
          <View style={styles.rowOfTiles} key={i}>
            {row}
          </View>
        );
        row = [];
      } if (i === this.state.devices.length - 1) {
        rowsOfTiles.push(

          <View style={styles.rowOfTiles} key={i}>
            {row}

            <TouchableOpacity style={styles.tile} onPress={() => this.goToModalScreen('NewDevice', 'New device')}>

              <Text style={styles.tileTextPlus}>+</Text>

            </TouchableOpacity>
          </View>

        )
      }
    }

    return (
      <LinearGradient colors={['#A6fcd2','#Afd5f6']} style={styles.linearGradient}>
      <ScrollView style={styles.container}
        refreshControl={<RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
        }>
        <View>
          <Header
            centerComponent={{ text: 'Device', style: { color: '#F5F5F5', fontSize: 25 } }}
          />
        </View>
        {rowsOfTiles}


      </ScrollView>
      </LinearGradient>


    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  tile: {
    width: 150,
    height: 150,
    margin: 15,
    justifyContent: 'center'
  },
  rowOfTiles: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  tileTextName: {
    fontSize: 28,
    textAlign: 'center'
  },
  tileTextPlace: {
    fontSize: 20,
    textAlign: 'center'
  },
  tileTextPlus: {
    fontSize: 96,
    textAlign: 'center',
    borderWidth: 1,
  },
  tileTextId: {
    fontSize: 20,
    textAlign: 'center'
  }

});