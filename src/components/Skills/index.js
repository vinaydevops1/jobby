import './index.css'

const Skills = props => {
  const {each} = props
  const {imageUrl, name} = each
  console.log(each)
  return (
    <>
      <li className="skill-content">
        <img src={imageUrl} alt={name} className="skill-size" />
        <p>{name}</p>
      </li>
    </>
  )
}

export default Skills
