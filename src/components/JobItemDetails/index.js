import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {GoLinkExternal} from 'react-icons/go'
import {MdLocationOn, MdStar, MdWork} from 'react-icons/md'
import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        id: data.job_details.id,
        location: data.job_details.location,
        rating: data.job_details.rating,
        packagePer: data.job_details.package_per_annum,
        skills: data.job_details.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        lifeAtCompany: data.job_details.life_at_company.description,
        lifeImageUrl: data.job_details.life_at_company.image_url,
        title: data.job_details.title,
      }

      const similarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        id: each.id,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        similarJobs,
        jobDetails: updatedJobDetails,
        apiStatus: apiStatusConstants.success,
      })
      console.log(updatedJobDetails)
      console.log(similarJobs)
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="Rings" color="#ffffff" height="80" width={80} />
    </div>
  )

  onClickRetry = () => {
    const {history} = this.props
    history.replace('/jobs')
  }

  renderJobDetails = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      rating,
      location,
      title,
      id,
      employmentType,
      skills,
      packagePer,
      lifeAtCompany,
      companyWebsiteUrl,
      jobDescription,
      lifeImageUrl,
    } = jobDetails

    return (
      <>
        <div className="job-item-container">
          <div className="list-style">
            <div className="img-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo-size"
              />
              <div>
                <h1>{title}</h1>
                <div className="icon-container">
                  <MdStar className="icon-style-star" />
                  <p>{rating}</p>
                </div>
              </div>
            </div>
            <div className="salary-container">
              <div className="icon-container">
                <MdLocationOn className="icon-style" />
                <p>{location}</p>
              </div>
              <div className="icon-container">
                <MdWork className="icon-style" /> <p>{employmentType}</p>
              </div>

              <p className="salary">{packagePer}</p>
            </div>
            <hr />
            <div className="visit-container">
              <h1>Description</h1>
              <a
                href={companyWebsiteUrl}
                target="__block"
                className="anchor-container"
              >
                Visit
                <GoLinkExternal />
              </a>
            </div>
            <p>{jobDescription}</p>
            <h1>Skills</h1>
            <ul className="skills-container">
              {skills.map(each => (
                <Skills each={each} key={each.name} />
              ))}
            </ul>
            <h1>Life at Company</h1>
            <div className="life-container">
              <p>{lifeAtCompany}</p>
              <img
                src={lifeImageUrl}
                alt="life at company"
                className="life-size"
              />
            </div>
          </div>
          <h1>Similar Jobs</h1>
          <ul className="similar-items-container">
            {similarJobs.map(each => (
              <SimilarJobs each={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
    )
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
      <button type="button" onClick={this.onClickRetry} className="button">
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
}

export default JobItemDetails
