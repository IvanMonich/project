import {React, useContext, useEffect, useState} from 'react';
import {UserContext} from '../../App'

const ProfilePage = () => {
    const [mypics, setPics] = useState([])
    const {state, dispatch} = useContext(UserContext)
    const [image, setImage] = useState("")

    const [schedules, setSchedules] = useState([
        {
            name: "КТсо2-6",
            weeks: [
                {
                    days: [
                        {
                            name: "Понедельник",
                            lessons: [
                                {
                                    number: 2,
                                    name: "Безопасность операционных систем",
                                    teacher: "Пескова О. Ю.",
                                    typeOfLesson: "Дистанционная",
                                    link: "https://vk.com/away.php?to=https%3A%2F%2Fteams.microsoft.com%2Fl%2Fmeetup-join%2F19%3Ad1f2276d22d14986b5e1d1f3987f7239%40thread.tacv2%2F1652692348637%3Fcontext%3D%257B%2522Tid%2522%3A%252219ba435d-e46c-436a-84f2-1b01e693e480%2522%2C%2522Oid%2522%3A%2522e764f7a7-7cbb-4b02-bea9-6267c08cd354%2522%257D&cc_key="
                                }
                            ]
                        },
                        {
                            name: "Вторник",
                            lessons: [
                                {
                                    number: 2,
                                    name: "Безопасность операционных систем",
                                    teacher: "Пескова О. Ю.",
                                    typeOfLesson: "Очная",
                                    link: ""
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ])
    // useEffect(()=>{
    //     fetch('/mypost',{
    //         headers:{
    //             "Authorization":"Bearer "+localStorage.getItem("jwt")
    //         }
    //     }).then(res=>res.json())
    //         .then(result=>{
    //             console.log(result)
    //             setPics(result.mypost)
    //         })
    // },[])
    // useEffect(()=>{
    //     if(image){
    //         const data = new FormData()
    //         data.append("file",image)
    //         data.append("upload_preset","insta-clone")
    //         data.append("cloud_name","cnq")
    //         fetch("https://api.cloudinary.com/v1_1/cnq/image/upload",{
    //             method:"post",
    //             body:data
    //         })
    //             .then(res=>res.json())
    //             .then(data=>{
    //
    //
    //                 fetch('/updatepic',{
    //                     method:"put",
    //                     headers:{
    //                         "Content-Type":"application/json",
    //                         "Authorization":"Bearer "+localStorage.getItem("jwt")
    //                     },
    //                     body:JSON.stringify({
    //                         pic:data.url
    //                     })
    //                 }).then(res=>res.json())
    //                     .then(result=>{
    //                         console.log(result)
    //                         localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
    //                         dispatch({type:"UPDATEPIC",payload:result.pic})
    //                         //window.location.reload()
    //                     })
    //
    //             })
    //             .catch(err=>{
    //                 console.log(err)
    //             })
    //     }
    // },[image])

    const updatePhoto = (file)=>{
        setImage(file)
    }

    return (
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style={{
                margin:"18px 0px",
                borderBottom:"1px solid grey"
            }}>


                <div style={{
                    display:"flex",
                    justifyContent:"space-around",

                }}>
                    <div>
                        <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                             src={state?state.pic:"loading"}
                             alt=""
                        />

                    </div>
                    <div>
                        <h4>{state?state.name:"loading"}</h4>
                        <h5>{state?state.email:"loading"}</h5>
                        <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                            <h6>{mypics.length} posts</h6>
                            <h6>{state?state.followers.length:"0"} followers</h6>
                            <h6>{state?state.following.length:"0"} following</h6>
                        </div>

                    </div>
                </div>

                <div className="file-field input-field" style={{margin:"10px"}}>
                    <div className="btn #64b5f6 blue darken-1">
                        <span>Update pic</span>
                        <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                    mypics.map(item=>{
                        return(
                            <img key={item._id} className="item" src={item.photo} alt={item.title}/>
                        )
                    })
                }


            </div>
        </div>
    )
};

export default ProfilePage;