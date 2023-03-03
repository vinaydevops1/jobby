import {Link} from 'react-router-dom'

import './index.css'
import {MdLocationOn, MdWork, MdStar} from 'react-icons/md'

const JobItem = props => {
  const {jobItem} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    rating,
    location,
    packagePerAnnum,
    title,
  } = jobItem

  return (
    <>
      <Link to={`/jobs/${id}`} className="link-style">
        <li className="list-style">
          <div className="img-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
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

            <p className="salary">{packagePerAnnum}</p>
          </div>
          <hr />
          <div>
            <h1>Description</h1>
            <p>{jobDescription}</p>
          </div>
        </li>
      </Link>
    </>
  )
}

export default JobItem
