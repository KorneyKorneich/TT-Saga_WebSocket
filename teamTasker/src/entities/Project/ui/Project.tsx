import {Button} from "src/shared";
import {useParams} from "react-router";

export const Project = () => {
    const {projectId} = useParams()
    const handler = () => {

    }

    return(
        <>
            <div>Project {projectId}</div>
            <Button onClick={handler}></Button>
        </>

)
}
