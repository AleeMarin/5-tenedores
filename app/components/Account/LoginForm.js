import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Button, Icon, Input} from "react-native-elements";
import {validateEmail} from "../../utils/Validation";
import Loading from "../Loading";
import * as firebase from "firebase";
import {withNavigation} from "react-navigation";

function LoginForm(props) {
  const {toastRef, navigation} = props;
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);

  const login = async () => {
    setIsVisibleLoading(true);
    if (!email || !password) {
      toastRef.current.show("Todos los campos son obligatorios")
    } else if (!validateEmail(email)) {
      toastRef.current.show("El email no es válido")
    } else {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          () => {
            navigation.navigate("MyAccount")
          }
        )
        .catch(
          () => {
            toastRef.current.show("Error al iniciar sesión")
          }
        )
    }
    setIsVisibleLoading(false);
  };

  return (
    <View style={styles.formContainer}>
      <Input placeholder="Correo electrónico"
             containerStyle={styles.inputForm}
             onChange={(event) => setEmail(event.nativeEvent.text)}
             rightIcon={
               <Icon type="material-community"
                     name="at"
                     iconStyle={styles.iconRight}
               />
             }
      />
      <Input placeholder="Contraseña"
             password={true}
             secureTextEntry={hidePassword}
             containerStyle={styles.inputForm}
             onChange={(event) => setPassword(event.nativeEvent.text)}
             rightIcon={
               <Icon type="material-community"
                     name={hidePassword ? "eye-outline" : "eye-off-outline"}
                     iconStyle={styles.iconRight}
                     onPress={() => setHidePassword(!hidePassword)}
               />
             }
      />
      <Button title="Iniciar sesión"
              containerStyle={styles.btnContainerLogin}
              buttonStyle={styles.btnLogin}
              onPress={login}
      />
      <Loading text="Iniciando sesión"
               isVisible={isVisibleLoading}
      />
    </View>
  )
}

export default withNavigation(LoginForm);

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  iconRight: {
    color: "#c1c1c1",
  },
  btnContainerLogin: {
    marginTop: 20,
    width: "95%",
  },
  btnLogin: {
    backgroundColor: "#00a680",
  }
});