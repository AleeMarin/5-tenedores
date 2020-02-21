import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Button, Input} from "react-native-elements";
import * as firebase from "firebase";

export default function ChangeDisplayNameForm(props) {
  const {displayName, setIsVisibleModal, setReloadData, toastRef} = props;
  const [newDisplayName, setNewDisplayName] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateDisplayName = () => {
    setError(null);
    if (!newDisplayName) {
      setError("El nombre no ha cambiado")
    } else {
      setIsLoading(true);
      const update = {
        displayName: newDisplayName,
      };
      firebase
        .auth()
        .currentUser
        .updateProfile(update)
        .then(
          () => {
            setIsLoading(false);
            setReloadData(true);
            toastRef.current.show("Nombre actualizado correctamente");
            setIsVisibleModal(false);
          }
        )
        .catch(
          () => {
            setError("Error al actualizar el nombre");
            setIsLoading(false);
          }
        );
    }
  };

  return (
    <View style={styles.view}>
      <Input placeholder="Nombre"
             containerStyle={styles.input}
             defaultValue={displayName && displayName}
             onChange={(event) => setNewDisplayName(event.nativeEvent.text)}
             rightIcon={{
               type: "material-community",
               name: "account-circle-outline",
               color: "#c2c2c2",
             }}
             errorMessage={error}
      />
      <Button title="Cambiar nombre"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.btn}
              onPress={updateDisplayName}
              loading={isLoading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#00a680",
  }
});