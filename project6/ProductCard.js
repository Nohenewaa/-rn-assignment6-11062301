import React from 'react';
import { View, Text, Image, Button } from 'react-native';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <View>
      <Image source={product.image} style={{ width: 100, height: 100 }} />
      <Text>{product.name}</Text>
      <Text>${product.price}</Text>
      <Button title="Add to Cart" onPress={() => onAddToCart(product)} />
    </View>
  );
}