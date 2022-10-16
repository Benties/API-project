import { useHistory } from "react-router-dom"

const EditButton = ({spot}) => {
    const history = useHistory()
    console.log('THIS ISspot',   spot)
    const onClick = () => {
        history.push(`/`)

    }

    return (
        <button onClick={onClick}>update</button>
    )
}


export default EditButton
