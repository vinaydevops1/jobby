import {MdLocationOn, MdWork, MdStar} from 'react-icons/md'

import './index.css'

const SimilarJobs = props => {
  const {each} = props
  const {
    companyLogoUrl,
    rating,
    title,
    employmentType,
    location,
    jobDescription,
    id,
  } = each

  return (
    <div className="similar-items">
      <li className="list-style">
        <div className="img-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
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
        <div>
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
        <div className="salary-container">
          <div className="icon-container">
            <MdLocationOn className="icon-style" />
            <p>{location}</p>
          </div>
          <div className="icon-container">
            <MdWork className="icon-style" /> <p>{employmentType}</p>
          </div>
        </div>
      </li>
    </div>
  )
}

export default SimilarJobs
