import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        let cartData = await AsyncStorage.getItem('cart');
        setCart(cartData ? JSON.parse(cartData) : []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      let updatedCart = cart.filter(item => item.id !== productId);
      setCart(updatedCart);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error(error);
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cart}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
        <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
          <Image source={require('./assets/remove.png')} style={styles.removeIcon} />
        </TouchableOpacity>
      </View>
      <Text>{item.name} - ${item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderCartItem}
        columnWrapperStyle={styles.column}
      />
      <Button title="Back to Products" onPress={() => navigation.navigate('HomeScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  removeButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 15,
    padding: 5,
    backgroundColor: '#fff',
  },
  removeIcon: {
    width: 20,
    height: 20,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 2 / 3,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  column: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cart: {
    flex: 1,
    marginBottom: 20,
    alignItems: 'center',
  },
});

export default CartScreen;
