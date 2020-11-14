import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
//api imports
import {getProduct} from './src/apis/getProduct';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scanning: true,
      barCode: '',
      product: {},
    };
  }
  onBarCodeRead = async (e) => {
    const res = await getProduct(e.data);
    this.setState({
      product: res,
      scanning: false,
    });
    console.log('this.state.product: ', this.state.product);
  };
  render() {
    if (this.state.scanning) {
      return (
        <View style={styles.container}>
          <RNCamera
            style={styles.preview}
            torchMode={RNCamera.Constants.FlashMode.torch}
            onBarCodeRead={this.onBarCodeRead.bind(this)}
            ref={(cam) => (this.camera = cam)}
            // aspect={RNCamera.Constants.aspect.fill}
          >
            <Text
              style={{
                backgroundColor: 'white',
              }}>
              BARCODE SCANNER
            </Text>
          </RNCamera>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginTop: '20%',
            }}>
            {this.state.product.status === 200 ? (
              <View>
                {/* class */}
                <Text style={styles.productLabel}>
                  Class:{' '}
                  <Text style={styles.productText}>
                    {this.state.product.data.class}
                  </Text>
                </Text>
                {/* code */}
                <Text style={styles.productLabel}>
                  Code:{' '}
                  <Text style={styles.productText}>
                    {this.state.product.data.code}
                  </Text>
                </Text>
                {/* company */}
                <Text style={styles.productLabel}>
                  Company:{' '}
                  <Text style={styles.productText}>
                    {this.state.product.data.company}
                  </Text>
                </Text>
                {/* description */}
                <Text style={styles.productLabel}>
                  Description:{' '}
                  <Text style={styles.productText}>
                    {this.state.product.data.description}
                  </Text>
                </Text>
                {/* size */}
                <Text style={styles.productLabel}>
                  Size:{' '}
                  <Text style={styles.productText}>
                    {this.state.product.data.size}
                  </Text>
                </Text>
                <Image
                  source={{uri: this.state.product.data.image_url}}
                  style={{width: 200, height: 200, backgroundColor: 'blue'}}
                />
              </View>
            ) : null}
            <TouchableOpacity
              style={styles.scanAgainButton}
              onPress={() => this.setState({scanning: true})}>
              <Text style={styles.scanAgainButtonText}>Scan Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  // scanning
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraIcon: {
    margin: 5,
    height: 40,
    width: 40,
  },
  bottomOverlay: {
    position: 'absolute',
    width: '100%',
    flex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // show products
  productLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: '3%',
  },
  productText: {
    fontSize: 18,
    fontWeight: '300',
  },
  scanAgainButton: {
    width: '90%',
    height: '8%',
    backgroundColor: '#728530',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: '5%',
  },
  scanAgainButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
