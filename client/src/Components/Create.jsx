import React from 'react'

const Create = () => {
  return (
    <div
  className="sm:h-100p sm:w-100p md:h-60p md:w-60p lg:h-70p lg:w-10p flex flex-col justify-center items-center"
  style={{
    backgroundColor: 'rgb(247,248,249)',
    padding: '5%',
    borderRadius: '12px',
  }}
>
  <div
    className="h-10p w-90p flex flex-col justify-center items-center"
    style={{ marginBottom: '5%' }}
  >
    <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '2%' }}>
      Create your PopX account
    </h2>
  </div>

  {/* Input Fields */}
  <div
    className="h-50p w-90p flex flex-col justify-center items-center"
    style={{ gap: '3%' }}
  >
    {['Full Name', 'Phone number', 'Email address', 'Password', 'Company name'].map(
      (placeholder, index) => (
        <input
          key={index}
          type="text"
          placeholder={placeholder}
          className="h-10p w-90p"
          style={{
            padding: '2%',
            borderRadius: '8px',
            border: '1px solid rgb(206, 206, 206)',
            marginBottom: '2%',
          }}
          value="Marry Doe"
          readOnly
        />
      )
    )}
  </div>

  {/* Radio Options */}
  <div className="h-10p w-90p flex items-center" style={{ marginTop: '3%', marginBottom: '3%' }}>
    <p style={{ fontSize: '0.9rem', marginRight: '2%' }}>Are you an Agency? *</p>
    <label style={{ marginRight: '3%' }}>
      <input type="radio" name="agency" defaultChecked /> Yes
    </label>
    <label>
      <input type="radio" name="agency" /> No
    </label>
  </div>

  {/* Create Account Button */}
  <button
    className="h-10p w-90p text-white rounded"
    style={{
      backgroundColor: 'rgb(108, 37, 255)',
      padding: '2%',
      borderRadius: '8px',
      fontWeight: 'bold',
    }}
  >
    Create Account
  </button>
</div>

  )
}

export default Create