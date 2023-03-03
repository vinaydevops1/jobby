import {Link} from 'react-router-dom'

import './index.css'

import Header from '../Header'

const Home = props => {
  const onClickFindJobs = () => {
    const {history} = props
  }
  return (
    <div className="home-bg-container">
      <Header />
      <div className="bg-home-container">
        <h1>Find The Job That Fits Your Life</h1>
        <p>
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential
        </p>
        <Link to="/jobs" className="link-style">
          <button type="button" className="button" onClick={onClickFindJobs}>
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
