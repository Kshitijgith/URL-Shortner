import React from 'react'

const Login = () => {
  return (
    <div
  className="sm:h-100p sm:w-100p  md:h-60p md:w-60p lg:h-70p lg:w-40p flex flex-col items-center   rounded-xl"
  style={{
    backgroundColor: 'rgb(247, 248, 249)',
  }}
>
    <div className='h-8 w-100p'></div>
  <div className="h-10p w-90p flex flex-col justify-center items-start mb-5">
    <h2 className="text-2xl font-bold mb-1">Signin to your PopX account</h2>
    <p className="text-sm text-gray-600">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    </p>
  </div>
<div className='h-2 w-100p'></div>
  {/* Input Fields */}
  <div className="h-20p w-90p flex flex-col  gap-3">
    {['Email Address', 'Password'].map((placeholder, index) => (
      <div key={index} className="w-90p flex flex-col items-start">
        <label className="text-xs text-purple-700 mb-1">{placeholder}</label>
        <input
          type={placeholder === 'Password' ? 'password' : 'text'}
          placeholder={`Enter ${placeholder.toLowerCase()}`}
          className="h-100p w-90p p-2 rounded-md border border-gray-300"
        />
      </div>
    ))}
  </div>

  {/* Login Button */}
  <button className="h-10p w-90p hover:bg-violet-500 bg-gray-300  rounded-md font-bold text-gray-600 mt-3">
    Login
  </button>
</div>


  )
}

export default Login