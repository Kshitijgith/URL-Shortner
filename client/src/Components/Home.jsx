import React from 'react'

const Home = () => {
  return (
    <div className='sm:h-100p sm:w-100p md:h-60p md:w-60p lg:h-70p lg:w-10p  flex flex-col justify-end'  style={{ backgroundColor: 'rgb(247,248,249)' }}>
        <div className='h-40p w-100p flex flex-col justify-between items-center'>
            <div className='h-50p w-100p flex flex-col  items-center '>
                <div className='h-30p w-90p '> <h3 className='text-2xl font-bold'>Welcome to PopX</h3></div>
                 <p className='h-30p w-90p'>Lorem ipsum dolor sit amet<br/>
                    consectetur adipisicing elit. </p>
            </div>
            <button
  className="h-30p w-90p text-white rounded"
  style={{ backgroundColor: 'rgb(108, 37, 255)' }}
>
  Create Account
</button>

            <div className='h-10p'></div>
            <button className='h-30p w-90p bg-violet-500  rounded 'style={{ backgroundColor: 'rgb(206, 186, 251)' }} >Already Registered?Login</button>
        </div>
        <div className='h-10p w-100p'></div>
    </div>
  )
}

export default Home