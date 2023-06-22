"use client"
// import styles from './page.module.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "boxicons/css/boxicons.min.css";
import Image from "next/image";
import "./home.scss";
import insta from "@/app/img/insta.png";
import profile from "@/app/img/profile.jpg";
import babu from "@/app/img/babu.jpg";
import ismail from "@/app/img/ismail.jpg";
import mihad from "@/app/img/mihad.jpg";
import salauddin from "@/app/img/salauddin.jpg";
import robin from "@/app/img/robin.jpg";
import pimg from "@/app/img/pimg.jpg";
import icon from "@/app/img/icon.png";
import { CloseButton, ListGroup, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, deletePost, fetchAllPost } from "./postApi";
import Link from "next/link";
import { allPost } from "./postSlice";
import swal from "sweetalert";



export default function Home() {
    const dispatch = useDispatch();

    const {posts} = useSelector(allPost)

console.log(posts);
    //Create post state
    const [postcontent, setPostcontent] = useState();

    const handleContentBox = (e) =>{
        setPostcontent(e.target.value)
    }

    useEffect(()=>{
        dispatch(fetchAllPost())
    }, [dispatch])

    //Disable post area
    const [dispost, setDispost] = useState(true)

  //Image state
  const [images, setImages] = useState([]);


  const handleImageUpload =(e)=>{
      setImages((prevState)=>[...prevState, ...Array.from(e.target.files)]);
      if(e.target.value.length > 0) setDispost(false)
  }

  //Preview image delete
  const handleImagaDelete = (file)=>{
    const updatedImg = images.filter(data => data !== file)
    setImages(updatedImg)
    }

  //Modal show
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);

  //Modal handler
  const handleModalButton =(e)=>{
      e.preventDefault()
      setModalShow(true)
  } 

  //Image upload submit handler
  const handleImageUploadSubmit =  (e)=> {
    e.preventDefault();

    
    let i = 1;
        const data = new FormData();

        images.forEach((item)=>{

            data.append('file', item)
            data.append('cloud_name', 'dwvw7qjhc')
            data.append('upload_preset', 'wisdomweb')

             axios.post("https://api.cloudinary.com/v1_1/dwvw7qjhc/image/upload", data).then((res)=>{
                
                if(i === images.length){
                    setImages([]);
                }
                
                i++

                
                dispatch(createPost({content: postcontent, photo: res.data.url}));

                setModalShow(false);
                setDispost(true)
                setPostcontent("")

            })

        });

        
}

const [postId, setPostId] = useState("")
//Delete icon handler
const handleDeleteIcon = (id) =>{
    setPostId(id)
    setModalShow2(true)
}

const handleDeletePost = () =>{

    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
          if (willDelete) {
              dispatch(deletePost(postId));
          swal("Poof! Your post has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your poste is safe!");
        }
      });

    setModalShow2(false);
}
  return (
   <>
   
   <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <div className="left-area">
                        <div className="logo-area">
                            <Image src={insta} alt="" />
                        </div>
                        <div className="left-menu">
                            <ul>
                                <li><a href="#" style={{fontWeight: 600}}><i className='bx bxs-home'></i>Home</a></li>
                                <li><a href="#"><i className='bx bx-search'></i>Serch</a></li>
                                <li><a href="#"><i className='bx bx-compass' ></i>Explore</a></li>
                                <li><a href="#"><i className='bx bx-movie-play'></i>Reels</a></li>
                                <li><a href="#"><i className='bx bxl-telegram'></i>Messages</a></li>
                                <li><a href="#"><i className='bx bx-heart'></i>Notifications</a></li>
                                <li><a href="#" onClick={handleModalButton} ><i className='bx bxs-plus-square'></i>Create</a></li>
                                <li><a href="#"><Image className='left-profile-img' src={profile} alt="" /> Profile</a></li>
                            </ul>
                        </div>
                    </div>
                </div>     

                <div className="col-md-4">

                    {posts?.map((item, index)=>{
                        return (
                            <div className="post-area" key={index}>
                        <div className="post-user-top">
                            <div className="post-user-name">
                            <Image className='post-user-img' src={profile} alt="" />
                                <a>Saiful islam</a> • <p>7h</p>
                            </div>
                            <div className="post-topright">
                            <a onClick={()=> handleDeleteIcon(item._id)}> ••• </a>
                            </div>
                        </div>

                        <div className="post-images">
                            <Image src={item.photo} width={"400"} height={"350"} alt="" />
                        </div>

                        <div className="post-react-area">
                            <div className="react-left">
                                <ul>
                                    <li><a href="#"><i className='bx bx-heart'></i></a></li>
                                    <li><a href="#"><i className='bx bx-message-rounded'></i></a></li>
                                    <li><a href="#"><i className='bx bxl-telegram'></i></a></li>
                                </ul>
                            </div>
                            <div className="react-right">
                                <a href="#"><i className='bx bx-bookmark'></i></a>
                            </div>
                        </div>
                        <div className="exerp-area">
                                <p> {item.content} </p>
                        </div>

                        <div className="coment-area">
                            <span>See Translation</span>
                            <textarea placeholder='Add a comment...' name="" id="" cols="58" rows="1"></textarea>
                            <hr />
                        </div>
                    </div>
                        )
                    })}
                    
                    


                </div>   

                <div className="col-md-4">
                   <div className="right-area">
                        <div className="profile">
                            <div className="profile-img">
                                <Image className='right-profile-img' src={profile} alt="" />
                                <div className='profilename'>
                                <p>Saiful.xyz</p>
                                <p style={{color : '#9d9d9d'}}>Saiful islam</p>
                                </div>
                            </div>
                            <div className="switch-btn">
                                <a href="#">Switch</a>
                            </div>
                        </div>

                        <div className="suggesion-area">
                            <div className="profile-img">
                               <p>Suggestions for you</p>
                                
                            </div>
                            <div className="switch-btn">
                                <a href="#">See All</a>
                            </div>
                        </div>

                        <div className="suggesion-area">
                            <div className="profile-img">
                                <Image className='right-profile-img' src={babu} alt="" />
                                <div className='profilename'>
                                <p>Mahbub.Alam</p>
                                <p style={{color : '#9d9d9d'}}>Mahbub Alam</p>
                                </div>
                            </div>
                            <div className="switch-btn">
                                <a href="#">Follow</a>
                            </div>
                        </div>

                        <div className="suggesion-area">
                            <div className="profile-img">
                                <Image className='right-profile-img' src={salauddin} alt="" />
                                <div className='profilename'>
                                <p>S.M.Salahuddin</p>
                                <p style={{color : '#9d9d9d'}}>Salah Uddin</p>
                                </div>
                            </div>
                            <div className="switch-btn">
                                <a href="#">Follow</a>
                            </div>
                        </div>

                        <div className="suggesion-area">
                            <div className="profile-img">
                                <Image className='right-profile-img' src={mihad} alt="" />
                                <div className='profilename'>
                                <p>Khan Vai</p>
                                <p style={{color : '#9d9d9d'}}>Istiaq Khan</p>
                                </div>
                            </div>
                            <div className="switch-btn">
                                <a href="#">Follow</a>
                            </div>
                        </div>

                        <div className="suggesion-area">
                            <div className="profile-img">
                                <Image className='right-profile-img' src={robin} alt="" />
                                <div className='profilename'>
                                <p>Ziaul Haq Sumon</p>
                                <p style={{color : '#9d9d9d'}}>Salah Uddin</p>
                                </div>
                            </div>
                            <div className="switch-btn">
                                <a href="#">Follow</a>
                            </div>
                        </div>

                        <div className="suggesion-area">
                            <div className="profile-img">
                                <Image className='right-profile-img' src={ismail} alt="" />
                                <div className='profilename'>
                                <p>Bilal Ahmed</p>
                                <p style={{color : '#9d9d9d'}}>Mahbub Alam</p>
                                </div>
                            </div>
                            <div className="switch-btn">
                                <a href="#">Follow</a>
                            </div>
                        </div>

                   </div>
                </div>   
            </div>
        </div>

        <Modal show={modalShow} centered ClassName="modalwidth" size="lg">
            <ModalHeader>
                <h5 className='modal_title'>Create new post</h5>
                <CloseButton onClick={()=> setModalShow(false)} />
            </ModalHeader>
            <ModalBody>

                <form onSubmit={handleImageUploadSubmit}>


                    {dispost && <div className="my-3 image_upload">
                        <Image src={icon} alt="" />
                        <h2>Drag photos and videos here</h2>
                        <div className="uploadimg">
                          <label>
                          <input onChange={handleImageUpload} multiple type="file" />
                          <p>Select from computer</p>
                          </label>
                        
                        </div>
                        
                    </div> }
                    

                        {images.length > 0 && <div className="card">
                            <div className="row">
                                {images.map((image, index)=>{
                                    const imgURL = URL.createObjectURL(image)
                                    return <div className="col-md-6" key={index}>
                                    <div className="preview-img">
                                            <Image width={250} height={250} className='shadow' src={imgURL} alt="" />
                                            <button className='btn-close' onClick={()=> handleImagaDelete(image)}></button>
                                        </div>
                                    </div>
                                })}
                                <div className="col-md-6">
                                <textarea name="content" className="content_box" value={postcontent} onChange={handleContentBox}></textarea>
                                </div>
                            </div>
                        </div> }

                    <div className="my-3">
                        <button type='submit' className='btn btn-primary'>Post Now</button>
                    </div>
                </form>              
            </ModalBody>
        </Modal>


        <Modal className="delete_modal" size="sm" show={modalShow2} centered ClassName="modalwidth" onHide={()=> setModalShow2(false)}>
            <ModalBody>


                <ListGroup variant="flush">
                    <ListGroup.Item><Link href="/" onClick={handleDeletePost}>Delete</Link></ListGroup.Item>
                    <ListGroup.Item><a href="#">Edit</a></ListGroup.Item>
                    <ListGroup.Item><a href="#">Hide like account</a></ListGroup.Item>
                    <ListGroup.Item><a href="#">Turn off commenting</a></ListGroup.Item>
                    <ListGroup.Item><a href="#">Share to...</a></ListGroup.Item>
                    <ListGroup.Item><a href="#">Copy link</a></ListGroup.Item>
                    <ListGroup.Item><a href="#">Embed</a></ListGroup.Item>
                    <ListGroup.Item><a href="#">Cancel</a></ListGroup.Item>
                </ListGroup>
                             
            </ModalBody>
        </Modal>
   </>
  )
}
