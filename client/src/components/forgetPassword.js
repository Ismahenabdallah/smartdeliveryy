import React, {useState} from 'react'
import axios from 'axios'
import {isEmail} from '../util/validation/Validation'
import {showErrMsg, showSuccessMsg} from '../util/notification/Notification'

const initialState = {
    email: '',
    err: '',
    success: ''
}

function ForgetPassword() {
    const [data, setData] = useState(initialState)

    const {email, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }

    const forgotPassword = async () => {
        if(!isEmail(email))
            return setData({...data, err: 'Invalid emails.', success: ''})
            
        try {
            const res = await axios.post('http://localhost:5000/api/forget', {email})

            return setData({...data, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && setData({...data, err:  err.response.data.msg, success: ''})
        }
    }
    
    return (
        <div className="fg_pass mt-12 dark:bg-[#212533] dark:text-gray-400 h-[150vh]">
            <h2>Forgot Your Password?</h2>

            <div className="row">
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <label htmlFor="email">Enter your email address</label>
                <input type="email" name="email" id="email" value={email}
                onChange={handleChangeInput} />
                <button onClick={forgotPassword}>Verify your email</button>
            </div>
        </div>
    )
}

export default ForgetPassword
 