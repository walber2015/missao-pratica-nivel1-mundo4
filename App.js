
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View,Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker' ;

export default function App() {
  const [fornecedores, setFornecedores] = useState([]);
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [imagem, setImagem] = useState(null);
  const adicionarFornecedor = () => {
    if (nome && cnpj && telefone && imagem) {
      setFornecedores(prevFornecedores => [
        ...prevFornecedores,
        {
          id: Math.random().toString(),
          nome,
          cnpj,
          telefone,
          imagem,
        },
      ]);
    
      setNome('');
      setCnpj('');
      setTelefone('');
      setImagem(null);
    } else {
      Alert.alert('Erro', 'Preencha todos os campos, incluindo a imagem!');
    }
  };
  const solicitarPermissao = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'permissão necessária para acessar suas fotos.');
    }
  };
  const selecionarImagem = async () => {
    await solicitarPermissao();

    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!resultado .canceled) {
      setImagem(resultado.assets[0].uri); 
    }
  };
  const renderizarFornecedor = ({ item }) => (
    <View>
      {item.imagem ? (
        <Image style={styles.imagemPreview} source={{ uri: item.imagem }} />
      ) : (
        <Text>Sem imagem</Text>
      )}
      <Text >Nome: {item.nome}</Text>
      <Text>CNPJ: {item.cnpj}</Text>
      <Text>Telefone: {item.telefone}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text>cadastro de fornecedores</Text>
      <TextInput  placeholder='nome'value={nome} onChangeText={setNome}/>
      <TextInput  placeholder='cnpj' value={cnpj} onChangeText={setCnpj}/>
      <TextInput  placeholder='telefone' value={telefone} onChangeText={setTelefone}/>
       <Button title='Selecionar Imagem' onPress={selecionarImagem}/>
       <Button title='Cadastrar fornecedor' onPress={adicionarFornecedor}/>
       <FlatList data={fornecedores} keyExtractor={(item)=> item.id} renderItem={renderizarFornecedor}/>
      
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:100,
  },
  imagemPreview:{
    width:100,
    height:100,
  }
});
