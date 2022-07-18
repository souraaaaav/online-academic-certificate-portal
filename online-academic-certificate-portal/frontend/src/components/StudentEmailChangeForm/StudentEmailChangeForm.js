import React from 'react'
import './StudentEmailChangeForm.css'

const StudentEmailChangeForm = ({ login, isAuthenticated, isLoading, token, user }) => {

    const [userFormDetails, setUserFormDetails] = useState({
        email: "",
        password: ""
    })
    const { email, password } = userFormDetails

    const loginChange = (e) => {
        setUserFormDetails({
            ...userFormDetails,
            [e.target.name]: e.target.value
        })
    }
    const handleLoginSubmit = (e) => {
        e.preventDefault();

        login({ email, password })
    }
    if (isAuthenticated && user.is_chairman && user.email_validation) {
        return <Navigate to="/chairman/dashboard" />
    } else if (isAuthenticated && user.is_student && user.email_validation) {
        return <Navigate to="/student/dashboard" />
    }
    else if (isAuthenticated && (user.is_student || user.is_chairman) && !user.email_validation) {
        return <Navigate to="/user/email-confirm" />
    }

    return (
        <div className="form-container">
            <div className="avatar"></div>
            <div className="title">IIT Certificate</div>
            <div className="sub-title">CR3W</div>
            <form onSubmit={(e) => handleLoginSubmit(e)}>
                <div className="username">
                    <i className="fa fa-envelope"></i>
                    <input type="text"
                        className="name-input"
                        onChange={e => loginChange(e)}
                        placeholder="E-mail"
                        name="email"
                        value={email}
                    />
                </div>
                <div className="password">
                    <i className="fa fa-key"></i>
                    <input
                        className="password-input"
                        type="text"
                        onChange={e => loginChange(e)}
                        placeholder="Password"
                        name="password" value={password}
                    />
                </div>
                <input type="submit" value="Login" className="submit-input" />
                <Link to="/forget-password">
                    <p style={{ 'textAlign': 'center', 'marginTop': '15px' }}>Forgotten Password?</p>
                </Link>
                <Link to="/registration">
                    <input type="submit" value="Create Account" id="submit-registration" />
                </Link>

            </form>
        </div>
    )
}
Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    token: PropTypes.string,
    user: PropTypes.object
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    token: state.auth.token,
    user: state.auth.user
})

export default connect(mapStateToProps, { login })(StudentEmailChangeForm)