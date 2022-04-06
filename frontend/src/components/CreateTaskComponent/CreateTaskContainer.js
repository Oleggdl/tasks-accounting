import React from 'react'
import {compose} from "redux"
import {connect} from "react-redux"
import CreateTaskComponent from "./CreateTaskComponent"

const CreateTaskContainer = (props) => {

    return (
        <>
            <CreateTaskComponent tasks={props.tasks}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    tasks: state.tasksReducer.tasks
})

export default compose(
    connect(mapStateToProps, {})
)(CreateTaskContainer)


