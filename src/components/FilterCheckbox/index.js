import './index.css'

const FilterCheckbox = props => {
  const {employmentType, onChangeCheckbox} = props
  const {label, employmentTypeId} = employmentType

  const onChangeItem = () => {
    onChangeCheckbox(employmentTypeId)
  }

  return (
    <li className="list-style-filter">
      <input
        id={employmentTypeId}
        type="checkbox"
        name="type"
        value={employmentTypeId}
        onChange={onChangeItem}
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}

export default FilterCheckbox
