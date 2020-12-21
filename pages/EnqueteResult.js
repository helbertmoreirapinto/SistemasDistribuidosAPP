import React from 'react'
import { Button, Text, FlatList, View, StatusBar } from 'react-native'
import { Container, StartContainer, ItemText, TouchableItemList, CustomButton, ButtonText } from '../StyledComponents'
import axios from 'axios'
import { useNavigation, useRoute } from '@react-navigation/native'

class EnqueteScreenClasse extends React.Component {
  state: {
    dadosEnquete: Array
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      dadosEnquete: null,
    };
  }

  async componentDidMount () {
    const { route } = this.props
    const { enqueteId, usuarioId } = route.params
    const enquete = await this.getDadosEnquete(enqueteId, usuarioId)
    this.setState({ dadosEnquete: enquete })
  }

  async getDadosEnquete (enqueteId, usuarioId) {
    const config = {
      headers: {
        usuarioId
      }
    }
    return await axios
      .get(`https://helbert-usp.herokuapp.com/resultadoEnquete/${enqueteId}`, config)
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log('error:', err)
        return []
      })
  }

  render () {
    const { route, navigation } = this.props
    const { tituloEnquete, usuarioId, enqueteId } = route.params
    return (
      <Container>
        <StatusBar barStyle={'light-content'} backgroundColor="#5dbcd2" />
        <FlatList
          data={this.state.dadosEnquete}
          keyExtractor={(obj) => obj.id}
          renderItem={(obj) => {
            return (
              <TouchableItemList>
                <Text style={{ color: 'white', fontSize: 18, textAlign: 'left' }}>{obj.item.text}</Text>
                <Text style={{ color: 'white', fontSize: 18, textAlign: 'left' }}>{obj.item.count} votos</Text>
              </TouchableItemList>
            )
          }}
        />
      </Container>
    )
  }
}

export default function ListaEnquetes () {
  const route = useRoute()
  const navigation = useNavigation()

  return <EnqueteScreenClasse navigation={navigation} route={route} />
}
