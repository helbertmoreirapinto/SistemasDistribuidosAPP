import styled from 'styled-components'

export const StartContainer = styled.View`
  flex: 1;
  justify-content: flex-start;
  background-color: #0c1424;
  align-items: center;
`

export const CenterContainer = styled.View`
  flex: 1;
  background-color: #0c1424;
  align-items: center;
  justify-content: center;
`

export const Container = styled.View`
  width: 100%;
  flex: 1;
  background-color: #0c1424;
  align-items: center;
  justify-content: center;
`

export const LoginInput = styled.TextInput`
  background-color: white
  width: 60%;
  border-radius: 25px;
  padding: 10px 10px 10px 20px;
  margin-top: 10px;
`

export const TitleHome = styled.Text`
  color: #5dbcd2;
  font-size: 32px;
  margin-top: 10px;
  font-weight: bold;
  margin-bottom: 2%;
`

export const OptionsText = styled.Text`
  font-size: 20px;
  text-align: center;
`

export const ButtonContainer = styled.View`
  width: 60%;
  justify-content: space-evenly;
  flex-direction: row;
  margin-top: 15px;
`

export const CustomButton = styled.TouchableOpacity`
  background-color: #5dbcd2;
  border-radius: 5px;
  padding: 5px;
  align-items: center;
  justify-content: center;
`

export const ButtonText = styled.Text`
  width: 80px;
  color: white;
  font-size: 15px;
  text-align: center;
`

export const TouchableItemList = styled.View`
  flex-direction: row
  width: 550px;
  border: 1px solid white;
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
`

export const ItemText = styled.Text`
  font-size: 18px;
  color: white;
  width: 90%;
  text-align: left;
`
