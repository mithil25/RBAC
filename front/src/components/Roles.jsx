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

  const [sendObj, setSendObj] = useState({});

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
    console.log(a, b);
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
    if (accesscontrolsm !== undefined) {
      try {
        accesscontrolsm.methods
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

  const sendToken = async (a, b) => {
    if (accesscontrolsm !== undefined) {
      try {
        accesscontrolsm.methods
          .sendToken(a, b)
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
    if (accesscontrolsm !== undefined) {
      try {
        accesscontrolsm.methods
          .setParameters(a, b)
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
    if (accesscontrolsm !== undefined) {
      try {
        accesscontrolsm.methods.verifyRole(a, b).call();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const requestKey = async (a) => {
    if (accesscontrolsm !== undefined) {
      try {
        accesscontrolsm.methods
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

  return (
    <div>
      <div>
        <label className="font-semibold text-lg mx-2">User Address</label>
        <input
          className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2"
          value={sendObj.a}
          onChange={(e) => setSendObj({ ...sendObj, a: e.target.value })}
        />
        <label className="font-semibold text-lg mx-2">Role Name</label>
        <input
          className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2"
          value={sendObj.b}
          onChange={(e) => setSendObj({ ...sendObj, b: e.target.value })}
        />
        <button
          className="bg-gray-600 text-white font-semibold px-6 py-3 mt-4 border-2 rounded-md mx-8"
          onClick={() => setRole(sendObj.a, sendObj.b)}
        >
          Set Role
        </button>
      </div>
      <div>
        <label className="font-semibold text-lg mx-2">Verifier's Address</label>
        <input
          className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2"
          value={sendObj.c}
          onChange={(e) => setSendObj({ ...sendObj, c: e.target.value })}
        />
        <button
          className="bg-gray-600 text-white font-semibold px-6 py-3 mt-4 border-2 rounded-md mx-8"
          onClick={() => setVerifier(sendObj.c)}
        >
          Set Verifier
        </button>
      </div>
      <div>
        <label className="font-semibold text-lg mx-2">Role Name</label>
        <input
          className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2"
          value={sendObj.d}
          onChange={(e) => setSendObj({ ...sendObj, d: e.target.value })}
        />
        <label className="font-semibold text-lg mx-2">Level</label>
        <input
          className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2"
          value={sendObj.e}
          onChange={(e) => setSendObj({ ...sendObj, e: e.target.value })}
        />
        <button
          className="bg-gray-600 text-white font-semibold px-6 py-3 mt-4 border-2 rounded-md mx-8"
          onClick={() => setParameter(sendObj.d, sendObj.e)}
        >
          Set Parameter
        </button>
      </div>
      <div>
        <label className="font-semibold text-lg mx-2">User Address</label>
        <input
          className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2"
          value={sendObj.f}
          onChange={(e) => setSendObj({ ...sendObj, f: e.target.value })}
        />
        <label className="font-semibold text-lg mx-2">Role Name</label>
        <input
          className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2"
          value={sendObj.g}
          onChange={(e) => setSendObj({ ...sendObj, g: e.target.value })}
        />
        <button
          className="bg-gray-600 text-white font-semibold px-6 py-3 mt-4 border-2 rounded-md mx-8"
          onClick={() => verifyRole(sendObj.f, sendObj.g)}
        >
          Verify Role
        </button>
      </div>
      <div>
        <label className="font-semibold text-lg mx-2">User Address</label>
        <input
          className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2"
          value={sendObj.h}
          onChange={(e) => setSendObj({ ...sendObj, h: e.target.value })}
        />
        <button
          className="bg-gray-600 text-white font-semibold px-6 py-3 mt-4 border-2 rounded-md mx-8"
          onClick={() => requestKey(sendObj.h)}
        >
          Request Key
        </button>
      </div>
      <div>
        <label className="font-semibold text-lg mx-2">Key</label>
        <input
          className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2"
          value={sendObj.i}
          onChange={(e) => setSendObj({ ...sendObj, i: e.target.value })}
        />
        <label className="font-semibold text-lg mx-2">User Address</label>
        <input
          className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2"
          value={sendObj.j}
          onChange={(e) => setSendObj({ ...sendObj, j: e.target.value })}
        />
        <button
          className="bg-gray-600 text-white font-semibold px-6 py-3 mt-4 border-2 rounded-md mx-8"
          onClick={() => sendKey(sendObj.i, sendObj.j)}
        >
          Send Key
        </button>
      </div>
      <div>
        <label className="font-semibold text-lg mx-2">User Address</label>
        <input
          className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2"
          value={sendObj.k}
          onChange={(e) => setSendObj({ ...sendObj, k: e.target.value })}
        />
        <label className="font-semibold text-lg mx-2">Amount</label>
        <input
          className="shadow border rounded w-96 py-2 px-3 inline-flex mt-2 mx-2"
          value={sendObj.l}
          onChange={(e) => setSendObj({ ...sendObj, l: e.target.value })}
        />
        <button
          className="bg-gray-600 text-white font-semibold px-6 py-3 mt-4 border-2 rounded-md mx-8"
          onClick={() => sendKey(sendObj.i, sendObj.j)}
        >
          Send Token
        </button>
      </div>
    </div>
  );
}

export default Roles;
