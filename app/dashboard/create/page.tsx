"use client";
import { uploadToIPFS } from "@/utils";
import Image from "next/image";
import { useState, useEffect } from "react";
import { fetchUsername } from "@/utils";
// import ToggleButton from "react-toggle-button";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { Transaction, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Keypair, sendAndConfirmTransaction, Connection, clusterApiUrl } from "@solana/web3.js";


const Create = () => {

    const { publicKey,wallets, sendTransaction } = useWallet();
    const [formInput, setFormInput] = useState({
        shortlist: false,
        stake: false,
        name: "",
        description: "",
        venue: "",
        date: "",
        supply: "",
        uri: "",
        stakePrice: "",
    });
    const [username, setUsername] = useState("iamacid");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsernameCall();
    }, []);

    async function createEvent(amount: number) {
        const connection = new Connection(clusterApiUrl("devnet"));
        const transaction = new Transaction();
        const kpid = Keypair.generate();
        console.log(`Sender is ${publicKey} and the receiver is ${kpid.publicKey}`);
        
        const sendSolInstruction = SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: kpid.publicKey,
          lamports: LAMPORTS_PER_SOL * amount,
        });
      
        transaction.add(sendSolInstruction);
      
        
      
        sendTransaction(transaction, connection).then((sig) => {
            console.log(sig);
          });
        console.log("public key detected", publicKey);
        console.log("event created");
    }

    async function fetchUsernameCall() {
        setLoading(true);
        let user = await fetchUsername();
        // setUsername(user);
        setUsername("iamacid");
        setLoading(false);
    }

    async function formURI() {
        const { name, description, venue, date } = formInput;
        if (!name || !description || !venue || !date) return;
        const data = JSON.stringify({ name, description, venue, date });
        const files = [new File([data], "data.json")];
        const metaCID = await uploadToIPFS(files);
        const url = `https://ipfs.io/ipfs/${metaCID}/data.json`;
        console.log(url);
        return url;
    }

    async function publish() {
        setLoading(true);
        const uri = await formURI();
        await createEvent(0.1);
        setLoading(false);
    }

    return (
        <div className="bg-[#25143a] text-white  px-8">
            <div className="flex justify-between items-center py-4">
                <Link href="/">
                    <Image
                        src={"/iks-logo.png"}
                        width={300}
                        height={300}
                        alt="iks logo"
                    />
                </Link>
                <div className="flex  ">
                    <button className="rounded-full h-[] px-8 mr-8 flex items-center bg-gradient-to-r from-[#9000FF] to-[#1D102700] ">
                        {/* <Image
              src={"/bored_ape_image.png"}
              width={30}
              height={50}
              alt="bored ape nft image"
              className="rounded-xl"
            /> */}
                        <p>@{username}</p>
                    </button>
                    {/* remaning: fix the basic gradients of this */}
                    <button className="flex items-center py-3 px-3 rounded-lg border border-white">
                        <Image
                            src={wallets[0].adapter.icon}
                            width={"30"}
                            height={"30"}
                            alt="Metamask fox svg"
                        />
                        <p className="ml-2">{publicKey?.toString()}</p>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2">
                <div className="">
                    <div>
                        <div className="flex flex-col w-1/2 mx-auto justify-center">
                            <div className="flex items-center ">
                                <div className="relative mx-4">
                                    <Image
                                        src={"/icons/arrow.svg"}
                                        width={20}
                                        height={20}
                                        alt="arrow"
                                        className="absolute top-2.5 left-1"
                                    />
                                    <Link href="/dashboard/active">
                                        <Image
                                            src={"/icons/arrow-circle.svg"}
                                            width={30}
                                            height={20}
                                            alt="arrow-circle"
                                            className=""
                                        />
                                    </Link>
                                </div>
                                <p className="text-3xl my-3 ">
                                    Create an Event
                                </p>
                            </div>
                            <div className="my-3 ">
                                <p className="text-xl ">Upload a file</p>
                                <p className="text-white opacity-40">
                                    Upload or choose your file to upload
                                </p>
                            </div>
                            <label className="flex justify-center py-44 w-96 mx-auto  border-2 bg-[#1E1E1EA6] border-white border-opacity-40 border-dashed  rounded-md  cursor-pointer ">
                                <span className="flex items-center ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        />
                                    </svg>
                                    <span className="font-medium text-gray-600 ">
                                        PNG, JPG, GIF, WEBP
                                    </span>
                                </span>
                                <input
                                    type="file"
                                    name="file_upload"
                                    className="hidden"
                                />
                            </label>
                            <div className="flex justify-around my-8  ">
                                <Image
                                    src={"/bored_ape_image.png"}
                                    width={60}
                                    height={60}
                                    alt="bored ape nft"
                                    className="rounded-lg"
                                />
                                <Image
                                    src={"/bored_ape_image.png"}
                                    width={60}
                                    height={60}
                                    alt="bored ape nft"
                                    className="rounded-lg"
                                />
                                <Image
                                    src={"/bored_ape_image.png"}
                                    width={60}
                                    height={60}
                                    alt="bored ape nft"
                                    className="rounded-lg"
                                />
                                <Image
                                    src={"/bored_ape_image.png"}
                                    width={60}
                                    height={60}
                                    alt="bored ape nft"
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-16">
                    <div className="flex flex-col w-3/4 mx-auto  ">
                        <div className="py-4 flex justify-between">
                            <div className=" ">
                                <h3 className="text-xl">Shortlist events</h3>
                                <p className="opacity-40">
                                    Display this on feature section of landing
                                    page.
                                </p>
                            </div>
                            {/* https://gdowens.github.io/react-toggle-button/ to use toggle in the actual code */}
                            {/* <ToggleButton value={false} /> */}
                        </div>
                        <label className="pb-2">Event Name</label>
                        <input
                            type="text"
                            id="event-name"
                            placeholder="eg. name of the event"
                            className="bg-[#1E1E1EA6] rounded-lg p-2"
                            onChange={(e) =>
                                setFormInput({
                                    ...formInput,
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex flex-col w-3/4 mx-auto my-4">
                        <label className="pb-2">Description</label>
                        <textarea
                            className="bg-[#1E1E1EA6] rounded-lg resize-none "
                            onChange={(e) =>
                                setFormInput({
                                    ...formInput,
                                    description: e.target.value,
                                })
                            }
                            //   change this if scroll bar is appereing
                            rows={2}
                        ></textarea>
                    </div>
                    <div className=" flex w-3/4 mx-auto  ">
                        <div className="flex flex-col w-3/4 mx-auto my-4 mr-6 ">
                            <label>Supply</label>
                            <input
                                type="text"
                                id="event-name"
                                placeholder="2000"
                                className="bg-[#1E1e1ea6] w-full rounded-lg p-2 "
                                onChange={(e) =>
                                    setFormInput({
                                        ...formInput,
                                        supply: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="flex flex-col w-3/4 mx-auto my-4">
                            <label>Venue</label>
                            <input
                                type="text"
                                id="event-name"
                                placeholder="Example Text"
                                className="bg-[#1E1e1ea6] rounded-lg p-2"
                                onChange={(e) =>
                                    setFormInput({
                                        ...formInput,
                                        venue: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-3/4 mx-auto my-4 ">
                        <label>Date</label>
                        <input
                            type="date"
                            id="event-name"
                            className="bg-[#1E1E1EA6]  rounded-lg p-2"
                            onChange={(e) =>
                                setFormInput({
                                    ...formInput,
                                    date: e.target.value,
                                })
                            }
                        />
                    </div>
                    {/*  */}
                    {/* <div className="flex flex-col w-3/4 mx-auto my-4 ">
            <label>Stake price</label>
            <div className="">
              <input
                type="text"
                id="event-name"
                placeholder="0.01ETH"
                className="bg-[#1E1e1ea6] rounded-lg  relative p-2"
                onChange={(e) =>
                  setFormInput({
                    ...formInput,
                    stakePrice: e.target.value,
                  })
                }
              />
              
            </div>
          </div> */}
                    {/*  */}
                    <div className="flex flex-col w-3/4 mx-auto my-4 ">
                        <label>Stake the price</label>
                        <div className="relative flex flex-col items-center  w-full ">
                            <input
                                type="text"
                                id="event-name"
                                placeholder="0.01 ETH"
                                className="bg-[#1E1E1EA6] rounded-lg p-2 w-full py-4"
                                onChange={(e) =>
                                    setFormInput({
                                        ...formInput,
                                        stakePrice: e.target.value,
                                    })
                                }
                            />
                            <button
                                className=" border w-1/6 absolute right-24 my-3 mr-4 px-4 py-1 rounded-lg bg-[#2F2F2F] border-[#1E1E1ED9] "
                                onClick={() =>
                                    setFormInput({
                                        ...formInput,
                                        stake: true,
                                    })
                                }
                            >
                                Enable
                            </button>
                            <button
                                className="border w-1/6 absolute right-2 my-3 px-4 py-1 rounded-lg bg-white text-black "
                                onClick={() =>
                                    setFormInput({
                                        ...formInput,
                                        stake: false,
                                    })
                                }
                            >
                                Disable
                            </button>
                        </div>
                    </div>
                    <div className="w-3/4 mx-auto flex justify-evenly my-6">
                        {/* <button className="px-4 py-2 border rounded-lg">
                            Preview
                        </button> */}
                        <button
                            className="px-4 py-2 border rounded-lg"
                            onClick={publish}
                        >
                            Publish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;
