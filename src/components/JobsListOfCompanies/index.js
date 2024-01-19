import './index.css'

const JobsListOfCompanies = props => {
  const {eachSkillsItem} = props
  console.log(eachSkillsItem)
  return (
    <li className="each-skill">
      <img
        src={eachSkillsItem.imageUrl}
        alt={eachSkillsItem.name}
        className="skills-image"
      />
      <p>{eachSkillsItem.name}</p>
    </li>
  )
}

export default JobsListOfCompanies
