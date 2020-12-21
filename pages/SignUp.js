import React, { useState } from 'react'
// import { Button, StyleSheet, Text, View } from 'react-native'
import { CenterContainer, LoginInput, ButtonContainer, TitleHome, CustomButton, ButtonText } from '../StyledComponents'
import axios from 'axios'

async function createUser (nome, user, pass) {
  const config = {
    headers: {}
  }

  return await axios
    .get(`https://helbert-usp.herokuapp.com/criarUsuario/${nome}/${user}/${pass}`, config)
    .then((res) => {
      return res.data.id
    })
    .catch((err) => {
      console.log('error:', err)
      return null
    })
}

export default function SignupScreen ({ navigation }) {
  const [nome, setNome] = useState('')
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  return (
    <CenterContainer>
      <TitleHome>Votation Now</TitleHome>
      <LoginInput placeholder="Nome" onChangeText={(txt) => setNome(txt)} />
      <LoginInput placeholder="Login" onChangeText={(txt) => setUser(txt)} />
      <LoginInput password placeholder="Senha" secureTextEntry={true} onChangeText={(txt) => setPass(txt)} />
      <ButtonContainer>
        <CustomButton
          onPress={async () => {
            const usuarioId = await createUser(nome, user, pass)
            if (usuarioId != null) navigation.navigate('ListaEnquetes', { usuarioId })
            else alert('Problema ao criar usuário.')
          }}
        >
          <ButtonText>Cadastrar</ButtonText>
        </CustomButton>
      </ButtonContainer>
    </CenterContainer>
  )
}
