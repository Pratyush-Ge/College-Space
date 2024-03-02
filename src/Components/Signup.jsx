import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login'); 
    };

    return (
      <section className="bg-white">
      <div className="flex flex-col items-center justify-center px-2 py-2 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-slate-900 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-green-600 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-1 text-sm font-small text-green-600 dark:text-white">Email</label>
                <input type="email" name="email" id="email" className="bg-white border border-green-600 text-green-600 sm:text-sm rounded-lg   focus:ring-green-600 focus:border-green-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@surname.com" required />
              </div>
              <div>
                <label htmlFor="name" className="block mb-1 text-sm font-small text-green-600 dark:text-white">Name</label>
                <input type="text" name="name" id="name" className="bg-white border border-green-600 text-green-600 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Laraib" required />
              </div>
              <div>
                <label htmlFor="usn" className="block mb-1 text-sm font-small text-green-600 dark:text-white">USN</label>
                <input type="text" name="usn" id="usn" className="bg-white border border-green-600 text-green-600 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="eg. 1SI21IS024" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-1 text-sm font-small text-green-600 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-white border border-green-600 text-green-600 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Create an account</button>
              <p className="text-sm font-light text-green-600 dark:text-gray-400">
                Already have an account? <a href="#" className="font-medium text-green-600 hover:underline dark:text-green-500" onClick={handleLoginClick}>Login here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
      );
}

export default Signup;
