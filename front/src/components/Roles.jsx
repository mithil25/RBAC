import React, { useEffect, useState } from "react";
import AccessControl from "./../abis/AccessControl.json";
import AccessToken from "./../abis/AccessToken.json";
import Web3 from "web3";

function Roles() {
  useEffect(() => {
    loadWeb3();
    LoadBlockchaindata();
  }, []);

  const [account, setAccount] = useState();

  function handleLogout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("email");
    window.location.reload(true);
  }

  const [accesscontrolsm, setAccesscontrolsm] = useState();
  const [accesstokensm, setAccesstokensm] = useState();

  const [userAddress, setUserAddress] = useState();
  const [verifierAddress, setVerifierAddress] = useState();
  const [roleName, setRoleName] = useState();
  const [level, setLevel] = useState();
  const [key, setKey] = useState();

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

  const setRole = async (a, b) => {
    console.log(a,b)
    if (accesscontrolsm !== undefined) {
      try {
        accesscontrolsm.methods
          .setRole(a, b)
          .send({ from: account })
          .on("transactionhash", () => {
            console.log("successfull");
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const setVerifier = async (a) => {
    if (accesscontrolsm != undefined) {
      try {
        accesscontrolsm.methods.methods
          .setVerifier(a)
          .send({ from: account })
          .on("transactionhash", () => {
            console.log("successfull");
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const sendToken = async (a, amount) => {
    if (accesscontrolsm != undefined) {
      try {
        accesscontrolsm.methods.methods
          .sendToken(a, amount)
          .send({ from: account })
          .on("transactionhash", () => {
            console.log("successfull");
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const setParameter = async (a, b) => {
    if (accesscontrolsm != undefined) {
      try {
        accesscontrolsm.methods.methods
          .setParameter(a, b)
          .send({ from: account })
          .on("transactionhash", () => {
            console.log("successfull");
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const verifyRole = async (a, b) => {
    if (accesscontrolsm != undefined) {
      try {
        accesscontrolsm.methods.methods.verifyRole(a, b).call();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const requestKey = async (a) => {
    if (accesscontrolsm != undefined) {
      try {
        accesscontrolsm.methods.methods
          .requestKey(a)
          .send({ from: account })
          .on("transactionhash", () => {
            console.log("successfull");
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const sendKey = async (a, b) => {
    if (accesscontrolsm != undefined) {
      try {
        accesscontrolsm.methods.methods
          .setRole(a, b)
          .send({ from: account })
          .on("transactionhash", () => {
            console.log("successfull");
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div>
      <div>
        <label className="font-semibold text-lg mx-2">User Address</label>
        <input
          className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <label className="font-semibold text-lg mx-2">Role Name</label>
        <input
          className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
        <button
          className="bg-gray-600 text-white font-semibold px-6 py-3 mt-4 border-2 rounded-md mx-8"
          onClick={() => setRole(userAddress, roleName)}
        >
          Set Role
        </button>
      </div>
      <div>
        <label className="font-semibold text-lg mx-2">Verifier's Address</label>
        <input
          className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2"
          value={verifierAddress}
          onChange={(e) => setVerifierAddress(e.target.value)}
        />
        <button
          className="bg-gray-600 text-white font-semibold px-6 py-3 mt-4 border-2 rounded-md mx-8"
          onClick={() => setVerifier(verifierAddress)}
        >
          Set Verifier
        </button>
      </div>
      <div>
        <label className="font-semibold text-lg mx-2">Role Name</label>
        <input
          className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
        <label className="font-semibold text-lg mx-2">Level</label>
        <input
          className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2"
          value={level}
          onChange={(e) => setRole(e.target.value)}
        />
        <button
          className="bg-gray-600 text-white font-semibold px-6 py-3 mt-4 border-2 rounded-md mx-8"
          onClick={() => setParameter(roleName, level)}
        >
          Set Parameter
        </button>
      </div>
      <div>
        <label className="font-semibold text-lg mx-2">User Address</label>
        <input
          className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <label className="font-semibold text-lg mx-2">Role Name</label>
        <input
          className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
        <button
          className="bg-gray-600 text-white font-semibold px-6 py-3 mt-4 border-2 rounded-md mx-8"
          onClick={() => verifyRole(userAddress, roleName)}
        >
          Verify Role
        </button>
      </div>
      <div>
        <label className="font-semibold text-lg mx-2">User Address</label>
        <input
          className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <button
          className="bg-gray-600 text-white font-semibold px-6 py-3 mt-4 border-2 rounded-md mx-8"
          onClick={() => requestKey(userAddress)}
        >
          Request Key
        </button>
      </div>
      <div>
        <label className="font-semibold text-lg mx-2">Key</label>
        <input
          className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <label className="font-semibold text-lg mx-2">User Address</label>
        <input
          className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <button
          className="bg-gray-600 text-white font-semibold px-6 py-3 mt-4 border-2 rounded-md mx-8"
          onClick={() => sendKey(key, userAddress)}
        >
          Send Key
        </button>
      </div>
    </div>
  );
}

export default Roles;
