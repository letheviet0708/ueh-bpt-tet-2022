import PageWrapper from '../components/PageWrapper'
import styles from '../styles/Home.module.css'
import Banner from '../components/Banner';

import firebase from 'firebase/app';
import { Component } from 'react'

class Home extends Component {

  check = () => {
    console.log(firebase.auth().currentUser)
  }

  render(){
    return (
      <div>
        <PageWrapper>
          <Banner/>
          <button onClick = {this.check}>check cehck</button>
        </PageWrapper>
      </div>
    );
  }
}

export default Home
