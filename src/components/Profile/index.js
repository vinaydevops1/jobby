import './index.css'

const ProfileItemDetails = props => {
  const {profile} = props
  const {name, profileImg, shortBio} = profile

  return (
    <div className="profile-container">
      <img src={profileImg} alt="profile" className="profile-img" />
      <h1 className="name">{name}</h1>
      <p className="bio">{shortBio}</p>
    </div>
  )
}

export default ProfileItemDetails
