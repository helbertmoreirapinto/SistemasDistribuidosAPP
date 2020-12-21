import React, { useState } from 'react'
// import { Button } from 'react-native'
// import { TextInput } from 'react-native-gesture-handler'
import { CenterContainer, LoginInput, ButtonContainer, TitleHome, CustomButton, ButtonText } from '../StyledComponents'
import axios from 'axios'

async function LoginSystem (user, pass) {
  const usuario = {
    login: user,
    senha: pass
  }

  const config = {
    headers: {}
  }

  return await axios
    .post('https://helbert-usp.herokuapp.com/logar', usuario, config)
    .then((res) => {
      return res.data.id
    })
    .catch((err) => {
      console.log('error:', err)
      return null
    })
}

export default function Login ({ navigation }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  return (
    <CenterContainer>
      <TitleHome>Votation Now</TitleHome>
      <LoginInput placeholder="Nome de Usuário" onChangeText={(txt) => setUser(txt)} />
      <LoginInput secureTextEntry={true} placeholder="Senha" onChangeText={(txt) => setPass(txt)} />
      <ButtonContainer>
        <CustomButton
          onPress={async () => {
            const usuarioId = await LoginSystem(user, pass)
            if (usuarioId != null) navigation.navigate('ListaEnquetes', { usuarioId })
            else alert('Erro ao executar login. Tente novamente')
          }}
        >
          <ButtonText>Login</ButtonText>
        </CustomButton>
        <CustomButton onPress={() => navigation.navigate('Cadastro')}>
          <ButtonText>Criar conta</ButtonText>
        </CustomButton>
      </ButtonContainer>
    </CenterContainer>
  )
}
