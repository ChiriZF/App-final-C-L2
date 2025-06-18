import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';


const Stack = createNativeStackNavigator();

const productos = [
  {
    id: '1',
    nombre: 'Playera DISTREET ',
    precio: 400,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAqTrebC3iZH6CMdGkVzHW93lRX5DRmoyR7Jflc27TjokhRSXPifscw_Mq1bAK1FjnZXo&usqp=CAU',
    reseñas: [5, 4, 4, 5],
    
  },
  
  {
    id: '2',
    nombre: 'Conjunto CasaBlanca ',
    precio: 3899,
    imagen: 'https://calzetshop.com/wp-content/uploads/2023/05/edc0f59b-removebg-preview-1000x1000.png',
    reseñas: [3, 4, 5],
  },
  {
    id: '3',
    nombre: 'Conjunto DISTREET',
    precio: 1200,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8dsWCz_9cOP3YdtZWd-UUKr7D2H2HcEzmPlLMgmPFYO4aV1l8sDwx0JfbjPK72HpeFrU&usqp=CAU',
    reseñas: [5, 5, 5, 4],
  },
  {
    id: '4',
    nombre: 'Nike air max 720',
    precio: 4299,
    imagen: 'https://sizeer.hu/media/cache/gallery/rc/qhtkrmlj/nike-air-max-720-20-ferfi-sportcipo-fekete-ct5229-001.jpg',
    reseñas: [3, 4, 5],
    
  },

  {
    id: '5',
    nombre: 'Sudadera DISTREET',
    precio: 700,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSuyZHCmmsuZGU75e05R0lztqe7T0cgZVKGg&s',
    reseñas: [3, 4, 5],
  },

  {
    id: '6',
    nombre: 'Playera PEOBLEMS',
    precio: 350,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQko9N1ZQjKXt6LCIykzgpsIiEXBnbNuzV-UHZdTzdhCyIrsQtsYEGErmOcOfBXaElTZkg&usqp=CAU',
    reseñas: [4, 4, 3],
  },
];

function HomeScreen({ navigation }) {
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [menuAbierto, setMenuAbierto] = useState(false);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    Alert.alert('✅ Producto agregado', `${producto.nombre} ha sido agregado al carrito.`);
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const promedioEstrellas = (reseñas) => {
    const total = reseñas.reduce((sum, r) => sum + r, 0);
    return Math.round(total / reseñas.length);
  };

  return (
    
    <View style={[styles.container, { backgroundColor: '#95f4ff' }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuAbierto(!menuAbierto)}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>HypeDrip</Text>
        
      </View>

      {/* Menú lateral */}
      {menuAbierto && (
        <View style={styles.menuLateral}>
          <View style={{ marginTop: 100 }}>
            <TouchableOpacity onPress={() => setMenuAbierto(false)}>
              <Text style={styles.menuItem}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setMenuAbierto(false);
              navigation.navigate('Carrito', { carrito, setCarrito });
            }}>
              <Text style={styles.menuItem}>🛒 Ir al carrito</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMenuAbierto(false)}>
              <Text style={styles.menuCerrar}>✖️ Cerrar menú</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      

      <ScrollView style={{ marginBottom: 60 }}>
        {/* Buscador */}
        <TextInput
          style={styles.input}
          placeholder="🔍 Buscar Hype"
          value={busqueda}
          onChangeText={setBusqueda}
        />

        {/* Productos destacados */}
        <Text style={styles.subtitulo}>🔥 Productos Hype 🔥</Text>
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Detalle', { producto: item, agregarAlCarrito })}
              style={styles.destacadoCard}
            >
              <Image source={{ uri: item.imagen }} style={styles.imagenDestacada} />
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text>💲 {item.precio.toFixed(2)}</Text>
              <View style={styles.estrellas}>
                {Array(promedioEstrellas(item.reseñas))
                  .fill()
                  .map((_, i) => (
                    <Text key={i}>⭐</Text>
                  ))}
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Todos los productos */}
        <Text style={styles.subtitulo}>Todos los productos</Text>
        <FlatList
          data={productosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Detalle', { producto: item, agregarAlCarrito })}
              style={styles.card}
            >
            
              <Image source={{ uri: item.imagen }} style={styles.imagen} />
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text>💲 {item.precio.toFixed(2)}</Text>
              <View style={styles.estrellas}>
                {Array(promedioEstrellas(item.reseñas))
                  .fill()
                  .map((_, i) => (
                    <Text key={i}>⭐</Text>
                  ))}
              </View>
              <TouchableOpacity
        onPress={() => agregarAlCarrito(producto)}
        style={[styles.botonAgregar, { backgroundColor: '#33ceff' }]}
      >
        <Text style={{ color: '#fff' }}>🛒 Agregar al carrito</Text>
      </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      </ScrollView>

      {/* Botón flotante carrito */}
      <View style={styles.botonFijo}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Carrito', { carrito, setCarrito })}
          style={styles.botonIrCarrito}
        >
          <Text style={styles.textoBoton}>Ver carrito ({carrito.length})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CarritoScreen({ route, navigation }) {
  const { carrito, setCarrito } = route.params;

  const total = carrito.reduce((sum, item) => sum + item.precio, 0);

  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 0);
    setCarrito(nuevoCarrito);
    Alert.alert('Producto eliminado');
  };

  return (
    
    <View style={[styles.container, { backgroundColor: '#f9f9f9' }]}>
      <Text style={styles.subtitulo}>🛒 Carrito</Text>
      <ScrollView style={{ marginBottom: 60 }}>
        {carrito.length === 0 ? (
          <Text style={{ textAlign: 'center' }}>El carrito está vacío.</Text>
        ) : (
          carrito.map((item, index) => (
            <View key={index} style={styles.card}>
              <Image source={{ uri: item.imagen }} style={styles.imagen} />
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text>💲 {item.precio.toFixed(2)}</Text>
              <TouchableOpacity
                onPress={() => eliminarDelCarrito(index)}
                style={[styles.botonAgregar, { backgroundColor: 'red' }]}
              >
                <Text style={{ color: '#fff' }}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
        <View style={styles.carrito}>
          <Text>🧾 Artículos: {carrito.length}</Text>
          <Text>💰 Total: ${total.toFixed(2)}</Text>
        </View>
      </ScrollView>

      {/* Botón flotante Comprar */}
      <View style={styles.botonFijo}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Pago', { total })}
          style={[styles.botonIrCarrito, { backgroundColor: '#33ceff' }]}
        >
          <Text style={styles.textoBoton}>💳 Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function PagoScreen({ route }) {
  const { total } = route.params;

  const confirmarPago = (metodo) => {
    Alert.alert('✅ Pago confirmado', `Has pagado $${total.toFixed(2)} con ${metodo}. ¡Gracias por tu compra!`);
  };

  return (
    <View style={[styles.container, { backgroundColor: '#f9f9f9' }]}>
      <Text style={styles.subtitulo}>💳 Opciones de pago</Text>
      <TouchableOpacity onPress={() => confirmarPago('Tarjeta de crédito')} style={styles.botonAgregar}>
        <Text style={{ color: '#fff' }}>Tarjeta de crédito</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => confirmarPago('PayPal')} style={styles.botonAgregar}>
        <Text style={{ color: '#fff' }}>PayPal</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => confirmarPago('Transferencia bancaria')} style={styles.botonAgregar}>
        <Text style={{ color: '#fff' }}>Transferencia bancaria</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => confirmarPago('OXXO Pay')} style={styles.botonAgregar}>
        <Text style={{ color: '#fff' }}>Pago en OXXO PAY</Text>
      </TouchableOpacity>
    </View>
  );
}

function DetalleProductoScreen({ route }) {
  const { producto, agregarAlCarrito } = route.params;

  const promedioEstrellas = (reseñas) => {
    const total = reseñas.reduce((sum, r) => sum + r, 0);
    return Math.round(total / reseñas.length);
  };


  return (
    <ScrollView style={[styles.container, { backgroundColor: '#f9f9f9' }]}>
      <Text style={styles.subtitulo}>{producto.nombre}</Text>
      <Image source={{ uri: producto.imagen }} style={styles.imagen} />
      <Text style={{ fontSize: 18, marginBottom: 10 }}>💲 {producto.precio.toFixed(2)}</Text>
      <Text style={{ marginBottom: 10 }}>Lo mas hype del momento, calidad premium que no te puedes perder.</Text>
      <Text style={styles.subtitulo}>⭐ Reseñas</Text>
      <View style={styles.estrellas}>
        {Array(promedioEstrellas(producto.reseñas))
          .fill()
          .map((_, i) => (
            <Text key={i}>⭐</Text>
          ))}
      </View>
      <View style={{ marginBottom: 20 }}>
        {producto.reseñas.map((r, index) => (
          <Text key={index}>⭐ {r} estrellas - ¡Muy buen producto!</Text>
        ))}
         <TouchableOpacity
        onPress={() => agregarAlCarrito(producto)}
        style={[styles.botonAgregar, { backgroundColor: '#28a745' }]}
      >
        <Text style={{ color: '#fff' }}>🛒 Agregar al carrito</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
  
}





export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Carrito" component={CarritoScreen} />
        <Stack.Screen name="Pago" component={PagoScreen} />
        <Stack.Screen name="Detalle" component={DetalleProductoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
header: {
  top: 0,
  left: 0,
  right: 0,
  paddingTop: StatusBar.currentHeight || 0, 
  height: 60 + (StatusBar.currentHeight || 40),
  backgroundColor: '#fff',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 10,
  elevation: 5,
  zIndex: 1000,
  backgroundColor: '#95f4ff',
},
menuIcon: {
  fontSize: 28,
  left: -100,
  
},
titulo: {
  fontSize: 24,
  fontWeight: 'bold',

},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor:'white',
  },
  card: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  imagen: {
    width: 250,
    height: 230,
    marginBottom:5,
    border: '3px solid black',
  },
  imagenDestacada: {
    width: 100,
    height: 120,
    margin: 10,
    border: '2px solid black',
  },
  nombre: {
    fontWeight:'bold',
    fontSize: 18,
  },
  botonAgregar: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  carrito: {
    padding: 10,
    backgroundColor: '#eee',
    marginTop: 10,

  },
  botonFijo: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  botonIrCarrito: {
    backgroundColor: '#00d8ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
  destacadoCard: {
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
    width: 140,
  },
  menuLateral: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    height: '100%',
    backgroundColor: '#95f4ff',
    padding: 10,
    zIndex: 999,
    elevation: 5,
  },
  menuItem: {
    fontSize: 18,
    marginBottom: 10,
  },
  menuCerrar: {
    fontSize: 16,
    color: 'red',
  },
  estrellas: {
    flexDirection: 'row',
    marginVertical: 5,
  },
});
