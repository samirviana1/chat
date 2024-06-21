import GenderCheckBox from "./GenderCheckBox"

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 max-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className="text-3x1 font-semibold text-center text-gray-300">
            Signup<span className="text-blue-500">Chat</span>
            </h1>
            <form>
                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">
                            Full Name
                        </span>
                    </label>
                <input type="text" placeholder="Samir" className="w-full input input-bordered h-10"/>
                </div>

                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">
                            UserName
                        </span>
                    </label>
                    <input type="text" placeholder="samir" className="w-full input input-bordered h-10"/>
                </div>

                <div>
                <label className="label">
                        <span className="text-base label-text">
                            Password
                        </span>
                </label>
                <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10"/>
                </div>

                <div>
                <label className="label">
                        <span className="text-base label-text">
                           Confirme Password
                        </span>
                </label>
                <input type="password" placeholder="Confirme Password" className="w-full input input-bordered h-10"/>
                </div>

                {/** gender checkbox goes here */}
                <GenderCheckBox />

                <a href="#" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">Already have an account?  </a>

                <div>
                <button className="btn btn-block btn-sm mt-2">Sign Up</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp
