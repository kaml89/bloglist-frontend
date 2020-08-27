import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter, useParams } from 'react-router-dom'

const User = ({ user }) => {
    const { id } = useParams()
    //console.log(user)
    return (
        <div>
            <div>
                {user.name}
            </div>
            <div>
            { user.blogs.map(blog => 
                <div>
                    <Link to={`/blogs/${blog.id}`}>
                        {blog.title}
                    </Link>
                </div>)}
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.users.items.find(user => user.id === ownProps.match.params.id)
    }
}

export default withRouter(connect(mapStateToProps)(User))