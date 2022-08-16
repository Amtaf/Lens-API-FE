import {useRouter} from 'next/router'
import { useState,useEffect } from 'react'
import {client,getProfiles,getPublications} from '../../api'
import Image from 'next/image'
import ABI from '../../abi.json'
import {ethers} from 'ethers'

const address = "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d"

export default function profile(){
    const[profile,setProfile] = useState([])
    const[pubs,setPubs] = useState([])
    const router = useRouter()
    const {id} = router.query

    useEffect(()=>{
        if(id){
            fetchProfile()
        }
    },[id])

    async function fetchProfile(){
        try{
            const response = await client.query(getProfiles, {id}).toPromise()
            console.log('response: ', response)
            setProfile(response.data.profiles.items[0])

            const publicationData = await client.query(getPublications, {id}).toPromise()
            console.log('PublicationsManenos:', publicationData);
            setPubs(publicationData.data.publications.items)
        }catch(err){
            
        }
        
    }

    async function connect(){
        try{
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            })
            console.log(accounts)

        }catch(err){

        }
 
    }

    async function followUser(){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(address,ABI,signer)
        try{
            const tx = contract.follow(
                [id],[0x0]
            )
            await tx.wait()
             console.log("Followed user ,Congrats...")
        }catch(err){

        }
    }
    if(!profile) return null
    return(
        <div>
            <h3>{profile.handle}</h3>
            <div>
            {profile.picture?
            (<Image src={profile.picture.original.url} width="300px" height="300px"/>):(
                <div style={{width:"300px", height:"300px", backgroundColor:"pink"}}/>
                )}
             <h2>{profile.name}</h2>     
            <h4>{profile.bio}</h4>
            </div>

           <div style={{display: "flex",justifyContent:"space-between",alignItems:"center", padding:"15px"}}>
           <button onClick={connect} style={{backgroundColor: "Green", color:"white", padding: "10px" , fontSize: "16px", borderRadius: "4px", width:"150px"}}>Connect</button>
            <button onClick={followUser} style={{backgroundColor: "Green", color:"white", padding: "10px" , fontSize: "16px", borderRadius: "4px", width:"150px"}}>Follow</button>
           </div>
            
            <div style={{display: "flex",justifyContent:"space-between"}}>
            {profile.stats ? (<h2> {profile.stats.totalFollowing} <p>Following</p></h2>) :(null) }
           {profile.stats ? (<h2> {profile.stats.totalFollowers}<p>Followers</p></h2> ) :(null) }
           {profile.stats ? (<h2> {profile.stats.totalPosts} <p>Posts </p></h2>) :(null) }

            
            </div>

            <p>
                <h2>Publications</h2>
                {pubs.map((pub,index)=>(
                <div style={{padding: '20px', borderTop: '1px solid pink'}}>{pub.metadata.content}</div>
            )
            )}</p>
            
        </div>
    )

}