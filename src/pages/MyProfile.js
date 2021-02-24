import React, { Component } from 'react'
import Navbar from '../components/Navbar'
// import myProfile from '../components/MyProfile/MyProfile'
import MyProfile2 from "../components/MyProfile/MyProfile";


export default class MyProfile extends Component {
    render() {
        return (
            <>
                <Navbar />
                {/* <myProfile /> */}
                <MyProfile2 />
            </>
        )
    }
}
