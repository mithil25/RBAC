import React, { useEffect, useState } from "react";
import AccessControl from "./../abis/AccessControl.json";
import AccessToken from "./../abis/AccessToken.json";
import Web3 from "web3";

function Roles({ setAccount, account }) {
  useEffect(() => {
    loadWeb3();
    LoadBlockchaindata();
  }, []);

  function handleLogout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("email");
    window.location.reload(true);
  }

  const [accesscontrolsm, setAccesscontrolsm] = useState();
  const [accesstokensm, setAccesstokensm] = useState();

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const LoadBlockchaindata = async () => {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setAccount(account);

    const networkID = await web3.eth.net.getId();

    const networkData1 = AccessControl.networks[networkID];
    const networkData2 = AccessToken.networks[networkID];

    if (!networkData1) {
      window.alert("The Smart contract is not deployed on current network");
    } else {
      const metadata = new web3.eth.Contract(
        AccessControl.abi,
        networkData1.address
      );
      setAccesscontrolsm(metadata);
      const token = new web3.eth.Contract(
        AccessToken.abi,
        networkData2.address
      );
      setAccesstokensm(token);
    }
  };

  const setRole = async () => {
    if (accesscontrolsm != undefined) {
      try {
        accesscontrolsm.methods.methods
          .setRole("0x123", "Chaprasi")
          .send({ from: account })
          .on("transactionhash", () => {
            console.log("successfull");
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const setVerifier = async () => {
    if (accesscontrolsm != undefined) {
      try {
        accesscontrolsm.methods.methods
          .setVerifier("0x123")
          .send({ from: account })
          .on("transactionhash", () => {
            console.log("successfull");
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const sendToken = async (amount) => {
    if (accesscontrolsm != undefined) {
      try {
        accesscontrolsm.methods.methods
          .sendToken("0x123", amount)
          .send({ from: account })
          .on("transactionhash", () => {
            console.log("successfull");
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const setParameter = async (x, y) => {
    if (accesscontrolsm != undefined) {
      try {
        accesscontrolsm.methods.methods
          .setParameter("Chaprasi", 2)
          .send({ from: account })
          .on("transactionhash", () => {
            console.log("successfull");
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const verifyRole = async () => {
    if (accesscontrolsm != undefined) {
      try {
        accesscontrolsm.methods.methods.verifyRole("0x123", "Chaprasi").call();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const requestKey = async () => {
    if (accesscontrolsm != undefined) {
      try {
        accesscontrolsm.methods.methods
          .requestKey("0x123")
          .send({ from: account })
          .on("transactionhash", () => {
            console.log("successfull");
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const sendKey = async () => {
    if (accesscontrolsm != undefined) {
      try {
        accesscontrolsm.methods.methods
          .setRole("0x123")
          .send({ from: account })
          .on("transactionhash", () => {
            console.log("successfull");
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return <div>Hello World</div>;
}

export default Roles;
