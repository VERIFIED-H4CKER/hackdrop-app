import { useEffect, useState } from 'react'

import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native'

import axios from 'axios'

export default function OrdersScreen() {

 const [orders, setOrders] = useState<any[]>([])

  const fetchOrders = async () => {

    try {

      const response = await axios.get(
        'https://hackdrop-app.onrender.com/orders'
      )

      setOrders(response.data)

    } catch (error) {

      console.log(error)
    }
  }

  useEffect(() => {

    fetchOrders()

  }, [])

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        HACKDROP ORDERS
      </Text>
<Text style={{color:'white'}}>
  {JSON.stringify(orders)}
</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}

        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={styles.text}>
              Name: {item.name}
            </Text>

            <Text style={styles.text}>
              Hostel: {item.hostel}
            </Text>

            <Text style={styles.text}>
              Room: {item.room}
            </Text>

            <Text style={styles.text}>
              Product: {item.product}
            </Text>

          </View>
        )}
      />

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    paddingTop: 50,
  },

  heading: {
    color: '#00ff99',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },

  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 5,
  },
})