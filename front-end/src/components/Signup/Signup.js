import React, {useState} from "react";
import {Link, useNavigate, useLocation} from "react-router-dom";
import axios from "axios";
import "./Signup.scss";
import validator from "validator";
import {ThreeDots} from "react-loader-spinner";

const SignUp = () => {
	
	const navigation = useNavigate();
	const location = useLocation();
	const [signupMessage, setsignupMessage] = useState(false);
	const [showLoader, setshowLoader] = useState(false);
	const [signupDetails, setsignupDetails] = useState({
		firstName: "",
		lastName: "",
		emailName: "",
		passWord: "",
		shownPassword: false,
	});

	const signupHandler = async() => {
		try {
			const response = await axios.post("https://mobily-1.onrender.com/api/v1/signup", {
				email: signupDetails.emailName,
				password: signupDetails.passWord,
				firstName: signupDetails.firstName,
				lastName: signupDetails.lastName,
			});
            if (response.status === 200 || response.status === 201) {
                localStorage?.setItem(
					"token",
					JSON.stringify({
						token: response?.data?.token,
						
					})
				);
                setshowLoader((prev) => !prev);
                navigation("/?auth=true");

			} else {
				throw new Error("Failed to signup");
			}
		} catch (error) {
			console.log(error);
		}
		setsignupMessage((prev) => !prev);
	};

    const iconHandler = () => {
		setsignupDetails({
			...signupDetails,
			shownPassword: !signupDetails.shownPassword,
		});
    };
	return (
		<div className='signup-container'>
			<div className='spacer-3rem'></div>
			<div className='signup-component'>
				<label className='signup-header'>SIGN UP</label>
				<div className='form-signup'>
					<div className='componet-signup'>
						<label className='label-signup-name'>First Name </label>
						<input
							type='text'
							value={signupDetails.firstName}
							className='signup-input'
							placeholder='Enter your first name'
							onChange={(e) =>
								setsignupDetails({...signupDetails, firstName: e.target.value})
							}
							required
						/>
					</div>
					{signupMessage && signupDetails.firstName.length === 0 && (
						<label className='validate-message'>
							* First Name input filed is required{" "}
						</label>
					)}
					<div className='componet-signup'>
						<label className='label-signup-name'>Last Name </label>
						<input
							type='text'
							value={signupDetails.lastName}
							className='signup-input'
							placeholder='Enter your last name'
							onChange={(e) =>
								setsignupDetails({...signupDetails, lastName: e.target.value})
							}
							required
						/>
					</div>
					{signupMessage && signupDetails.lastName.length === 0 && (
						<label className='validate-message'>
							* Last Name input filed is required{" "}
						</label>
					)}
					<div className='componet-signup'>
						<label className='label-signup-name'>Email </label>
						<input
							type='email'
							value={signupDetails.emailName}
							className='signup-input'
							placeholder='sample@gmail.com'
							onChange={(e) =>
								setsignupDetails({...signupDetails, emailName: e.target.value})
							}
							required
						/>
					</div>
					{signupMessage && signupDetails.emailName.length === 0 && (
						<label className='validate-message'>
							* Email input filed is required{" "}
						</label>
					)}
					{signupDetails.emailName.length > 1 &&
					validator.isEmail(signupDetails.emailName) === false ? (
						<label className='validate-message'>Please enter valid email</label>
					) : (
						""
					)}
					<div className='componet-signup'>
						<label className='label-signup-name'>Password </label>
						<div className='show-password'>
							<input
								type={signupDetails.shownPassword ? "text" : "password"}
								value={signupDetails.passWord}
								className='signup-input'
								placeholder='Enter new password'
								onChange={(e) =>
									setsignupDetails({...signupDetails, passWord: e.target.value})
								}
								required
							/>
							{signupDetails.shownPassword ? (
								<i
									onClick={iconHandler}
									className='fas fa-eye password-icon'></i>
							) : (
								<i
									onClick={iconHandler}
									className='fas fa-eye-slash password-icon'></i>
							)}
						</div>
					</div>
					{signupMessage && signupDetails.passWord.length === 0 && (
						<label className='validate-message'>
							* Password input filed is required{" "}
						</label>
					)}
					<button className='register-btn' onClick={() => signupHandler()}>
						REGISTER
					</button>
					<label className='sigup-register'>
						Already registered? <Link to='/login'>Login here</Link>
					</label>
				</div>
			</div>
			<div className='spacer-3rem'></div>
			{showLoader && (
				<div className='loader-dots'>
					<ThreeDots color='#ff3f6c' height={100} width={100} timeout={5000} />
				</div>
			)}
		</div>
	);
};

export default SignUp;