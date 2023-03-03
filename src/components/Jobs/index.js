import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import ProfileItemDetails from '../Profile'
import FilterRadio from '../FilterRadio'
import FilterCheckbox from '../FilterCheckbox'
import JobItem from '../JobItem'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  noJobs: 'NO_JOBS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    profileDetails: {},
    profileError: true,
    salaryRange: '',
    employmentType: 'FULLTIME',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsDetails()
  }

  getJobsDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchInput, employmentType, salaryRange} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeRadio = label => {
    this.setState({salaryRange: label}, this.getJobsDetails)
  }

  onChangeCheckbox = label => {
    this.setState(
      {
        employmentType: label,
      },
      this.getJobsDetails,
    )
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const profileDetails = data.profile_details
      const updatedProfile = {
        name: profileDetails.name,
        shortBio: profileDetails.short_bio,
        profileImg: profileDetails.profile_image_url,
      }
      this.setState({
        profileDetails: updatedProfile,
      })
    } else {
      this.setState({profileError: false})
    }
  }

  onClickRetry = () => {
    this.getProfileDetails()
  }

  renderProfileDetails = () => {
    const {profileDetails, profileError} = this.state

    return (
      <div className="profile-retry-container">
        {profileError ? (
          <ProfileItemDetails profile={profileDetails} />
        ) : (
          <button type="button" className="button" onClick={this.onClickRetry}>
            Retry
          </button>
        )}
      </div>
    )
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    const noJobs = jobsList.length > 0
    if (!noJobs) {
      this.setState({
        apiStatus: apiStatusConstants.noJobs,
      })
    }

    return (
      <ul className="jobs-side-container">
        {jobsList.map(jobItem => (
          <JobItem jobItem={jobItem} key={jobItem.id} />
        ))}
      </ul>
    )
  }

  renderFilterRadio = () => (
    <>
      <ul className="checkbox-container">
        <h1 className="heading">Salary Range</h1>
        {salaryRangesList.map(salaryRange => (
          <FilterRadio
            salaryRange={salaryRange}
            key={salaryRange.label}
            onChange={this.onChangeRadio}
          />
        ))}
      </ul>
    </>
  )

  renderCheckbox = () => (
    <>
      <ul className="list-container">
        <h1 className="heading">Type of Employment</h1>
        {employmentTypesList.map(employmentType => (
          <FilterCheckbox
            employmentType={employmentType}
            key={employmentType.employmentTypeId}
            onChange={this.onChangeCheckbox}
          />
        ))}
      </ul>
    </>
  )

  onChangeSearch = event => {
    this.setState(
      {
        searchInput: event.target.value,
      },
      this.getJobsDetails,
    )
  }

  onClickCallApi = () => {
    this.getJobsDetails()
  }

  renderSearchInput = () => {
    const {searchInput} = this.state

    return (
      <div className="search-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          onChange={this.onChangeSearch}
          placeholder="Search"
        />
        <button
          type="button"
          className="button-search"
          data-testid="searchButton"
          onClick={this.onClickCallApi}
        >
          <BsSearch className="search" />
        </button>
      </div>
    )
  }

  renderNoJobsFound = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-job-img"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="Rings" color="#ffffff" height="80" width={80} />
    </div>
  )

  onClickRetryFailure = () => {
    this.getJobsDetails()
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>we cannot seem to find the page you are looking for</p>
      <button
        type="button"
        onClick={this.onClickRetryFailure}
        className="button"
      >
        Retry
      </button>
    </div>
  )

  renderFinalResult = () => {
    const {apiStatus, jobsList} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.noJobs:
        return this.renderNoJobsFound()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="bg-container-jobs">
          <Header />
          <div className="profile-jobs-container">
            <div className="profile-side-container">
              {this.renderProfileDetails()}
              <hr />
              {this.renderCheckbox()}
              <hr />
              {this.renderFilterRadio()}
            </div>
            <div className="jobs-list-container">
              {this.renderSearchInput()}
              {this.renderFinalResult()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
