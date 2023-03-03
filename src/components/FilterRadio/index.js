import './index.css'

const Filter = props => {
  const {salaryRange, onChangeRadio} = props
  const {label, salaryRangeId} = salaryRange

  const onChangeItem = () => {
    onChangeRadio(salaryRangeId)
  }

  return (
    <li className="list-style-filter">
      <input
        id={salaryRangeId}
        type="radio"
        name="salary"
        value={salaryRangeId}
        onChange={onChangeItem}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}

export default Filter
