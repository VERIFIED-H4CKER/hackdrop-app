import axios from 'axios'
import { useState } from 'react'

import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'

const products = [
  {
    id: 1,
    name: 'Maggi',
    price: 20,
    image:
      'https://images.unsplash.com/photo-1617093727343-374698b1b08d',
  },
  {
    id: 2,
    name: 'Coke',
    price: 40,
    image:
      'https://images.unsplash.com/photo-1629203851122-3726ecdf080e',
  },
  {
    id: 3,
    name: 'Chips',
    price: 30,
    image:
      'https://images.unsplash.com/photo-1566478989037-eec170784d0b',
  },
]

export default function HomeScreen() {

  const [name, setName] = useState('')
  const [hostel, setHostel] = useState('')
  const [room, setRoom] = useState('')

  const placeOrder = async (productName) => {

    if (!name || !hostel || !room) {

      Alert.alert(
        'HACKDROP',
        'Please fill all details'
      )

      return
    }

    try {

      const response = await axios.post(
        'https://hackdrop-app.onrender.com/order',
        {
          name,
          hostel,
          room,
          product: productName,
        }
      )

      Alert.alert(
        'HACKDROP',
        response.data.message
      )

    } catch (error) {

      Alert.alert(
        'HACKDROP',
        'Server Connection Failed'
      )

      console.log(error)
    }
  }

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.logo}>
        HACKDROP
      </Text>

      <Text style={styles.subtitle}>
        Fast Hostel Delivery
      </Text>

      <TextInput
        placeholder="Enter Name"
        placeholderTextColor="#999"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Enter Hostel"
        placeholderTextColor="#999"
        style={styles.input}
        value={hostel}
        onChangeText={setHostel}
      />

      <TextInput
        placeholder="Enter Room Number"
        placeholderTextColor="#999"
        style={styles.input}
        value={room}
        onChangeText={setRoom}
      />

      {products.map((product) => (

        <View
          key={product.id}
          style={styles.card}
        >

          <Image
            source={{ uri: product.image }}
            style={styles.image}
          />

          <Text style={styles.productName}>
            {product.name}
          </Text>

          <Text style={styles.price}>
            ₹{product.price}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => placeOrder(product.name)}
          >

            <Text style={styles.buttonText}>
              Order Now
            </Text>

          </TouchableOpacity>

        </View>
      ))}

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },

  logo: {
    color: '#00ff99',
    fontSize: 38,
    fontWeight: 'bold',
    marginTop: 40,
  },

  subtitle: {
    color: '#aaa',
    fontSize: 18,
    marginBottom: 30,
  },

  input: {
    backgroundColor: '#111',
    color: 'white',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },

  card: {
    backgroundColor: '#111',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },

  image: {
    width: '100%',
    height: 180,
    borderRadius: 15,
  },

  productName: {
    color: 'white',
    fontSize: 24,
    marginTop: 15,
    fontWeight: 'bold',
  },

  price: {
    color: '#00ff99',
    fontSize: 20,
    marginTop: 5,
  },

  button: {
    backgroundColor: '#00ff99',
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
    alignItems: 'center',
  },

  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
})