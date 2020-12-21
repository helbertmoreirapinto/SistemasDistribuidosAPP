import React from 'react'
import { Button, Text, FlatList, StatusBar } from 'react-native'
import { Container, StartContainer, ItemText, TouchableItemList, CustomButton, ButtonText } from '../StyledComponents'
import axios from 'axios'
import { useNavigation, useRoute } from '@react-navigation/native'

class ListaEnquetesClasse extends React.Component {
  state: {
    enquetes: Array
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      enquetes: [],
    };
  }

  async componentDidMount () {
    const { route } = this.props
    const { usuarioId } = route.params
    const enquetes = await this.getEnquetes(usuarioId)
    this.setState({ enquetes })
  }

  async getEnquetes (usuarioId) {
    const config = {
      headers: {
        usuarioId
      }
    }
    return await axios
      .get('https://helbert-usp.herokuapp.com/listarEnquete', config)
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log('error:', err)
        return null
      })
  }

  async encerrar (enqueteId, usuarioId) {
    const config = {
      headers: {
        usuarioId
      }
    }
    await axios
      .post('https://helbert-usp.herokuapp.com/encerrarEnquete', { enqueteId }, config)
      .then((res) => {
        alert('Enquete encerrada.')
      })
      .catch((err) => {
        console.log('error:', err)
        alert('Problema ao encerrar enquete.')
      })
    await this.reload()
  }

  async reload () {
    await this.componentDidMount()
    this.render()
  }

  render () {
    const { route, navigation } = this.props
    const { usuarioId } = route.params

    return (
      <Container>
        <CustomButton><ButtonText onPress={async () => {
          await this.reload()
        }}>Atualizar</ButtonText></CustomButton>
        <StatusBar barStyle={'light-content'} backgroundColor="#5dbcd2">
        </StatusBar>
        <FlatList
          data={this.state.enquetes}
          extraData={this.state}
          keyExtractor={(obj) => obj.id}
          renderItem={(obj) => {
            return (
              <TouchableItemList>
                <Text style={{ color: 'white', fontSize: 18, textAlign: 'left' }}>{obj.item.titulo}</Text>
                <CustomButton>
                {
                  usuarioId !== 1
                    ? <ButtonText onPress={() => navigation.navigate('EnqueteScreen', { usuarioId, enqueteId: obj.item.id, tituloEnquete: obj.item.titulo })}>Acessar</ButtonText>
                    : (obj.item.ativo)
                        ? <ButtonText onPress={async () => {
                          await this.encerrar(obj.item.id, usuarioId)
                          this.render()
                        }}>Encerrar</ButtonText>
                        : <ButtonText onPress={() => { navigation.navigate('EnqueteResult', { enqueteId: obj.item.id, usuarioId, tituloEnquete: obj.item.titulo }) }}>Resultado</ButtonText>
                }
                </CustomButton>
              </TouchableItemList>
            )
          }}
        />
        {
          usuarioId === 1
            ? <CustomButton>
              <ButtonText onPress={() => navigation.navigate('NewEnquete', { usuarioId })}>Novo</ButtonText>
            </CustomButton>
            : <ButtonText></ButtonText>
        }
      </Container>
    )
  }
}

export default function ListaEnquetes () {
  const route = useRoute()
  const navigation = useNavigation()

  return <ListaEnquetesClasse navigation={navigation} route={route} />
}
