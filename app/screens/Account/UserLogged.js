import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, View} from "react-native";
import {Button} from "react-native-elements";
import * as firebase from "firebase";
import InfoUser from "../../components/Account/InfoUser";
import Toast from "react-native-easy-toast";
import AccountOptions from "../../components/Account/AccountOptions";

export default function UserLogged() {
  const [userInfo, setUserInfo] = useState({});
  const [reloadData, setReloadData] = useState(false);
  const toastRef = useRef();

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.providerData[0]);
    })();
    setReloadData(false);
  }, [reloadData]);

  return (
    <View style={styles.viewUserInfo}>
      <InfoUser userInfo={userInfo}
                setReloadData={setReloadData}
                toastRef={toastRef}
      />
      <AccountOptions userInfo={userInfo}
                      setReloadData={setReloadData}
                      toastRef={toastRef}
      />
      <Button title="Cerrar sesión"
              buttonStyle={styles.btnCloseSession}
              titleStyle={styles.btnCloseSessionText}
              onPress={() => firebase.auth().signOut()}
      />
      <Toast ref={toastRef}
             position="center"
             opacity={0.5}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnCloseSessionText: {
    color: "#00a680",
  }
});