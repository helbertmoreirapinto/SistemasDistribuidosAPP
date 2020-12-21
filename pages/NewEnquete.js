import React, { useState } from 'react'
import { Button, Text, FlatList, View, StatusBar } from 'react-native'
import { CenterContainer, LoginInput, ButtonContainer, TitleHome, Container, StartContainer, ItemText, TouchableItemList, CustomButton, ButtonText } from '../StyledComponents'
import axios from 'axios'
import { useNavigation, useRoute } from '@react-navigation/native'

class NewEnqueteClasse extends React.Component {
  state: {
    titulo: String,
    opcao: String,
    opcoes: Array
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      titulo: "",
      opcao: "",
      opcoes: []
    }
    this.addItem = this.addItem.bind(this)
    this.setOpcao = this.setOpcao.bind(this)
    this.setTitulo = this.setTitulo.bind(this)
  }

  renderOpcao(obj){
    return(
      <Text style={{ color: 'white', fontSize: 18, textAlign: 'left' }}>{obj.item.mensagem}</Text>
    )
  }

  async createEnquete () {
    const { route } = this.props
    const { usuarioId } = route.params
    const config = {
      headers: { usuarioId }
    }
    const obj = {
      titulo: this.state.titulo,
      optionValues: this.state.opcoes
    }

    await axios
      .post('https://helbert-usp.herokuapp.com/criarEnquete', obj, config)
      .then((res) => {
        return res.data.id
      })
      .catch((err) => {
        console.log('error:', err)
        return null
      })
  }

  addItem () {
    let newItem = {
      mensagem: this.state.opcao
    }

    let opcoes = this.state.opcoes
    opcoes.push(newItem)
    this.setState({ opcoes })

    let opcao = ""
    this.setState({ opcao })
  }

  setTitulo(titulo){
    this.setState({ titulo })
  }

  setOpcao(opcao){
    this.setState({ opcao })
  }

  render(){
    const { route, navigation, state } = this.props
    const { usuarioId } = route.params
    return(
      <Container>
        <StatusBar barStyle={'light-content'} backgroundColor="#5dbcd2" />
        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
          <LoginInput style={{marginRight:50}} placeholder="Titulo" onChangeText={(txt) => this.setTitulo(txt)} />
          <CustomButton><ButtonText
            onPress={async () => {
              await this.createEnquete()
              navigation.navigate('ListaEnquetes', { usuarioId })
            }}>Salvar</ButtonText></CustomButton>
        </View>
        <FlatList style={{flexDirection:"row", marginRight:400}} data={this.state.opcoes} renderItem={this.renderOpcao} extraData={this.state} />
        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
          <LoginInput style={{marginRight:50}} placeholder="Adicionar" onChangeText={(txt) => this.setOpcao(txt)} />
          <CustomButton><ButtonText onPress={this.addItem}>Adicionar</ButtonText></CustomButton>
        </View>
      </Container>
    )
  }
}
export default function NewEnquete () {
  const route = useRoute()
  const navigation = useNavigation()
  
  return <NewEnqueteClasse navigation={navigation} route={route} />
}
